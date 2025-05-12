<?php

require __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->pokebuilder->users;

// Recibe datos JSON
$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['userName'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$passwordConfirm = $data['passwordConfirm'] ?? '';

if (!$username || !$email || !$password || !$passwordConfirm) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Correo electrónico inválido']);
    exit;
}

if ($password !== $passwordConfirm) {
    echo json_encode(['success' => false, 'message' => 'Las contraseñas no coinciden']);
    exit;
}

// Verifica si el usuario o email ya existen
$exists = $collection->findOne([
    '$or' => [
        ['username' => $username],
        ['email' => $email]
    ]
]);
if ($exists) {
    echo json_encode(['success' => false, 'message' => 'El usuario o correo ya existe']);
    exit;
}

// Inserta el nuevo usuario
$hash = password_hash($password, PASSWORD_DEFAULT);
try {
    $collection->insertOne([
        'username' => $username,
        'email' => $email,
        'password' => $hash,
        'joinDate' => new MongoDB\BSON\UTCDateTime()
    ]);
    echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al registrar usuario']);
}