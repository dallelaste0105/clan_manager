<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../controllers/credentialController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "POST") {
    $userController = new CredentialController($db);
    $userController->signupController();
} else {
    echo json_encode(["erro" => "Invalid method"]);
}
?>