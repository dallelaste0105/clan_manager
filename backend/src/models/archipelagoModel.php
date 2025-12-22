<?php
class ArchipelagoModel{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    function archipelagoVerifyModel($name){
        $player = $this->db->player->findOne([
            "name"=>$name
        ]);
        
        if (!$player) return null;

        $yourArchipelago = $this->db->archipelago->findOne(["playerName"=>$player["name"]]);
        
        // Se não tiver arquipélago, retorna null para o front criar um novo
        if (!$yourArchipelago) return null; 

        // O find retorna um cursor, precisamos iterar para pegar os valores
        $cursor = $this->db->islands->find(["archipelagoName"=>$yourArchipelago["name"]]);
        
        $seeds = [];
        foreach ($cursor as $island) {
            $seeds[] = $island["seed"];
        }
        
        return $seeds;
    }


    function getFirstEnemyPosition(){
        $firstEnemy = $this->db->player->findOne([],[
            'sort'  => ['level' => 1],
            'limit' => 1
        ]);
        $firstEnemyPosition = $this->db->archipelago->findOne([
            "playerName"=>$firstEnemy["name"]
        ]);
        return $firstEnemyPosition;
    }

    function saveArchipelago($userName, $archipelagoName, $x, $y){
        $player = $this->db->player->findOne([
            "name"=>$userName
        ]);
        $this->db->archipelago->insertOne([
            "name"=>$archipelagoName,
            "x"=>$x,
            "y"=>$y,
            "playerName"=>$player["name"]
        ]);
        $archipelagoName = $this->db->archipelago->findOne([
            "name"=>$archipelagoName
        ]);
        return $archipelagoName["name"];
    }

    function saveIsland($islandsList, $archipelagoName){
        // Array para armazenar nomes ou ids se necessário, mas por enquanto simplificado
        $savedIslands = [];
        
        for($i=0; $i<count($islandsList); $i++){
            $name = "Ilha_" . uniqid(); // Gerando um nome temporário único
            $this->db->islands->insertOne([
                "name"=>$name,
                "seed"=>$islandsList[$i],
                "archipelagoName"=>$archipelagoName
            ]);
        }
        
        return true; // Apenas confirma que salvou
    }
}
?>