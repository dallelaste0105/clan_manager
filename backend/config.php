<?php

require 'vendor/autoload.php';

$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $env = parse_ini_file($envPath);
} else {
    $env = [];
}

$uri = $env['MONGO_URI'] ?? 'mongodb://127.0.0.1:27017';
$dbName = $env['DB_NAME'] ?? 'clan_manager_db';

try {
    $client = new MongoDB\Client($uri);

    $db = $client->selectDatabase($dbName);
    
} catch (Exception $e) {
    http_response_code(500);
    die(json_encode(["ok" => false, "msg" => "Erro na conexão com Banco: " . $e->getMessage()]));
}
?>

//php -S localhost:8000