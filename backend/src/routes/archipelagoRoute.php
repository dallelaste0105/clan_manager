<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../controllers/archipelagoController.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "OPTIONS") {
    http_response_code(200);
    exit;
}

$req = json_decode(file_get_contents("php://input"), true);
$whitchFunction = $req["whitchFunction"] ?? null;
$archipelagoControllerInstance = new ArchipelagoController($db);

if ($requestMethod == "GET") {
    $archipelagoControllerInstance->archipelagoVerify();
    exit; 
}

if ($requestMethod == "POST") {
    switch ($whitchFunction) {
        case 'saveArchipelago':
            $archipelagoControllerInstance->saveArchipelago();
            exit; // 3. CORREÇÃO: Matar o script aqui também
        
        default:
            echo json_encode(["error" => "Função não encontrada"]);
            exit;
    }
}

// Se chegou aqui, é um método inválido
echo json_encode(["erro"=>"Invalid method"]);
?>