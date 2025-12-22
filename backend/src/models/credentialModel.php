<?php
session_start();

class CredentialModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    function signupModel($name, $password) {
        $hashed = password_hash($password, PASSWORD_DEFAULT);

        $response = $this->db->player->insertOne([
            "name" => $name,
            "password" => $hashed,
            "level" => 1
        ]);

        return $response->getInsertedId();
    }

    function loginModel($name, $password) {
        $res = $this->db->player->findOne(["name" => $name]);

        if (!$res) {
            return false;
        }

        if (password_verify($password, $res["password"])) {
            $_SESSION["name"] = $name;
            return true;
        }

        return false;
    }
}
?>