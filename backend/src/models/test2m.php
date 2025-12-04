<?php
class ClanModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    function createClanModel($name, $leader) {
        $response = $this->db->clans->insertOne([
            "name" => $name,
            "leader" => $leader
        ]);

        return $response->getInsertedId();
    }
}
?>