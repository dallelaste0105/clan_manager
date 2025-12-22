<?php
require_once __DIR__ . '/../models/archipelagoModel.php';
session_start();
class ArchipelagoController{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    function archipelagoVerify(){//verifica se o usuário já tem arquipélagos, se tem, retorna todos os seus dados
        $userName = $_SESSION["name"];
        $archipelagoModelInstance = new ArchipelagoModel($this->db);
        $yourArchipelagoSeeds = $archipelagoModelInstance->archipelagoVerifyModel($userName);
        echo json_encode(["ok"=>true, "msg"=>$yourArchipelagoSeeds]);
    }

    function saveArchipelago(){//salva o novo arquipélago e suas respectivas ilhas além de retornar o id das ilhas
        $archipelagoName = "ablubleh";//deve-se criar uma função para isso ser aleatório
        $userName = $_SESSION["name"];
        $archipelagoModelInstance = new ArchipelagoModel($this->db);
        $req = json_decode(file_get_contents("php://input"), true);
        $islandsList = $req["islandsList"] ?? "";

        $newArchipelagoXY = $archipelagoModelInstance->getFirstEnemyPosition();
        $archipelagoId = $archipelagoModelInstance->saveArchipelago($userName, $archipelagoName, $newArchipelagoXY["x"]+5, $newArchipelagoXY["y"]+5);
        $islandsId = $archipelagoModelInstance->saveIsland($islandsList, $archipelagoId);
        echo json_encode(["ok"=>true, "msg"=>$islandsId]);
    }
}
?>