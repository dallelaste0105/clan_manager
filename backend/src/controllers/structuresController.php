<?php
    require_once __DIR__ . '/../models/structuresModel.php';

    class StructuresController{
        private $db;

        public function __construct($db){
            $this->db = $db;
        }

        function saveCity(){
            $name = "ablubleh";
            $req = json_decode(file_get_contents("php://input"), true);
            $islandId = $req["islandId"];
            $cXMin = $req["cXMin"];
            $cXMax = $req["cXMax"];
            $cYMin = $req["cYMin"];
            $cYMax = $req["cYMax"];
            
            $structuresModel = new StructuresModel($this->db);
            $structuresModel->saveCity($name, $islandId, $cXMin, $cXMax, $cYMin, $cYMax);
        }
        
    }
?>