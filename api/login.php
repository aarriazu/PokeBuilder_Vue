<?php

require __DIR__ . '/../../vendor/autoload.php';
session_start();
header('Content-Type: application/json');

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->pokebuilder->users;

// Recibe datos JSON
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['userName'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

// Busca el usuario por nombre o email
$user = $collection->findOne([
    '$or' => [
        ['username' => $username],
        ['email' => $username]
    ]
]);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = (string)$user['_id'];
    $_SESSION['username'] = $user['username'];
    echo json_encode(['success' => true, 'username' => $user['username']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos']);
}