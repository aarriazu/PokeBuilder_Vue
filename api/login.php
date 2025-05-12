<?php

require __DIR__ . '/../../vendor/autoload.php';

// Configuración de CORS y headers
header("Access-Control-Allow-Origin: http://localhost:8100"); // localhost, es local
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de solicitudes OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

session_start();

try {
    $client = new MongoDB\Client("mongodb://localhost:27017");   // nos falta crear el mongoDB
    $collection = $client->pokebuilder->users;

    // Validar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido', 405);
    }

    // Leer y validar datos JSON
    $data = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON inválido', 400);
    }

    $username = $data['userName'] ?? '';
    $password = $data['password'] ?? '';

    if (!$username || !$password) {
        throw new Exception('Faltan datos de usuario o contraseña', 400);
    }

    // Buscar usuario
    $user = $collection->findOne([
        '$or' => [
            ['username' => $username],
            ['email' => $username]
        ]
    ]);

    if (!$user) {
        throw new Exception('Usuario no encontrado', 404);
    }

    // Verificar contraseña
    if (!password_verify($password, $user['password'])) {
        throw new Exception('Credenciales inválidas', 401);
    }

    // Establecer sesión
    $_SESSION['user_id'] = (string)$user['_id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['user_email'] = $user['email'] ?? '';
    $_SESSION['logged_in'] = true;

    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => (string)$user['_id'],
            'username' => $user['username'],
            'email' => $user['email'] ?? ''
        ],
        'session_id' => session_id()
    ]);

} catch (Exception $e) {
    // Manejo de errores
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_code' => $e->getCode()
    ]);
}