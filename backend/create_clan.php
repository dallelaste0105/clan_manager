<?php
// backend/create_clan.php

// 1. Permissões (CORS) - Deixa o React acessar
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 2. Conexão
require_once "./config.php"; // Usa seu arquivo de configuração já testado

// 3. Recebe os dados
$input = json_decode(file_get_contents("php://input"), true);

$clanName = $input['nome'] ?? '';   // Atenção aqui: chave 'nome'
$leader   = $input['lider'] ?? '';  // Atenção aqui: chave 'lider'

if (!$clanName || !$leader) {
    echo json_encode(["ok" => false, "msg" => "Faltou nome ou líder"]);
    exit;
}

// 4. Salva no MongoDB
try {
    // O banco selecionado é o definido no config.php (clan_manager_db)
    // A coleção será 'clans'
    $result = $db->clans->insertOne([
        "name" => $clanName,
        "leader" => $leader,
        "members" => 1,
        "resources" => ["gold" => 100],
        "created_at" => new MongoDB\BSON\UTCDateTime()
    ]);

    echo json_encode([
        "ok" => true, 
        "id" => (string) $result->getInsertedId()
    ]);

} catch (Exception $e) {
    echo json_encode(["ok" => false, "msg" => $e->getMessage()]);
}
?>