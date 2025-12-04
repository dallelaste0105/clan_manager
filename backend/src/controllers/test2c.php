<?php
require_once __DIR__ . '/../models/test2m.php'; // CORREÇÃO 1: Caminho relativo

class clanController{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    function createClan(){
        $input = json_decode(file_get_contents("php://input"), true);
        $name = $input['name'] ?? '';
        $leader = $input['leader'] ?? '';

        if (!$name || !$leader) {
            echo json_encode(["ok" => false, "msg" => "Dados incompletos"]);
            return;
        }

        $clanModel = new ClanModel($this->db);
        
        $id = $clanModel->createClanModel($name, $leader);
        
        echo json_encode(["ok" => true, "id" => (string)$id]);
    }
}
?>