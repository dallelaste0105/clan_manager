<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../controllers/UserController.php";

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "POST") {
    $userController = new CredentialController($db);
    $userController->signupController();
} else {
    echo json_encode(["erro" => "Invalid method"]);
}
?>