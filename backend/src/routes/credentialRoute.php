<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../controllers/credentialController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];
$req = json_decode(file_get_contents("php://input"), true);
$whitchFunction = $req["whitchFunction"];
$credentialController = new CredentialController($db);

if ($requestMethod == "POST") {
    switch ($whitchFunction) {
        case 'signup':
            $credentialController->signupController();
            break;
        case 'login':
            $credentialController->loginController();
            break;
        
        default:
            echo json_encode(["error" => "Algo deu errado no credenciamento"]);
            break;
    }
} else {
    echo json_encode(["error" => "Erro fatal: Método inválido"]);
}
?>