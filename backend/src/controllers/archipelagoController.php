<?php
require_once __DIR__ . '/../models/archipelagoModel.php';
session_start();
class ArchipelagoController{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    function archipelagoVerify(){
        $name = $_SESSION["name"];
        $archipelagoModelInstance = new ArchipelagoModel($db);
        $res = $archipelagoModelInstance->archipelagoVerifyModel($name);
        if ($res) {
            json_encode(["ok"=>true, "msg"=>$res]);
        }
        json_encode(["ok"=>false, "msg"=>"Nenhum arquipélago encontrado"]);
    }
}

?>