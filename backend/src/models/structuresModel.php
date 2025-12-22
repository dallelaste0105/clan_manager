<?php
session_start();

class StructuresModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }
    
    function saveCity($name, $islandId, $cXMin, $cXMax, $cYMin, $cYMax){
        $ok = $this->db->city->insertOne([
            "name"=>$name,
            "islandId"=>$islandId,
            "population"=>0,
            "cXMin" => $cXMin,
            "cXMax" => $cXMax,
            "cYMin" => $cYMin,
            "cYMax" => $cYMax
        ]);
    }

}
?>