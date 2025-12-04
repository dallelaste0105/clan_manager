<?php
// backend/config.php

// 1. Carrega a biblioteca do MongoDB
require 'vendor/autoload.php';

// 2. Carrega variáveis de ambiente (se existirem)
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $env = parse_ini_file($envPath);
} else {
    $env = [];
}

// 3. Configurações de Conexão
// Se não tiver no .env, usa o padrão localhost:27017
$uri = $env['MONGO_URI'] ?? 'mongodb://127.0.0.1:27017';
$dbName = $env['DB_NAME'] ?? 'clan_manager_db';

try {
    // 4. Cria a conexão
    $client = new MongoDB\Client($uri);
    
    // 5. Seleciona o Banco
    $db = $client->selectDatabase($dbName);
    
} catch (Exception $e) {
    // Se der erro, mata o processo e avisa o React
    http_response_code(500);
    die(json_encode(["ok" => false, "msg" => "Erro na conexão com Banco: " . $e->getMessage()]));
}
?>