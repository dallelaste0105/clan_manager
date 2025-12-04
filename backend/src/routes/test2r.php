<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if (!file_exists(__DIR__ . '/../../config.php')) {
    die(json_encode(["ok" => false, "msg" => "Erro Crítico: Não achei o config.php na pasta backend!"]));
}
require_once __DIR__ . '/../../config.php';

$caminhoController = __DIR__ . '/../controllers/test2c.php';

if (!file_exists($caminhoController)) {
    die(json_encode([
        "ok" => false, 
        "msg" => "Erro Crítico: O arquivo Controller não existe!",
        "caminho_tentado" => $caminhoController
    ]));
}

require_once $caminhoController;

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (class_exists('clanController')) {
        $controller = new clanController($db);
        $controller->createClan();
    } else {
        echo json_encode(["ok" => false, "msg" => "Erro: A classe 'clanController' não foi encontrada dentro do arquivo test2.php"]);
    }
} else {
    echo json_encode(["ok" => false, "msg" => "Método não permitido (Use POST)"]);
}
?>