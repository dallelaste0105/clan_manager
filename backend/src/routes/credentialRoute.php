<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../controllers/credentialController.php';

$req = json_decode(file_get_contents("php://input"), true);
$whitchFunction = $req["whitchFunction"] ?? null;

$credentialController = new CredentialController($db);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    switch ($whitchFunction) {
        case 'signup':
            echo json_encode($credentialController->signupController());
            break;

        case 'login':
            echo json_encode($credentialController->loginController());
            break;

        default:
            echo json_encode(["ok" => false, "msg" => "Função inválida"]);
    }
} else {
    echo json_encode(["ok" => false, "msg" => "Método inválido"]);
}
?>