<?php
class ArchipelagoModel{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    function archipelagoVerifyModel($name){
        $clanId = $db->clan->find(["name"=>$name]);
        $yourArchipelagos = $db->archipelago->find(["clanId"=>$clanId]);
        if ($yourArchipelagos) {
            return $yourArchipelagos[0];
        }
        return false;
    }
}
?>


