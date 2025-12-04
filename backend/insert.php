<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require_once "./config.php";

// JSON recebido do React
$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];

$stmt = $conn->prepare("INSERT INTO users (name) VALUES (?)");
$stmt->bind_param("s", $name);
$stmt->execute();

echo json_encode(["ok" => true]);