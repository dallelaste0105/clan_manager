<?php

class CredentialModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    function signupModel($name, $password) {

        $hashed = password_hash($password, PASSWORD_DEFAULT);

        $response = $this->db->users->insertOne([
            "name" => $name,
            "password" => $hashed
        ]);

        return $response->getInsertedId();
    }

    function loginModel($name, $password) {
        $res = $this->db->users->findOne(["name"=>$name]);

        if (!$res) {
            return false;
        }

        $hash = $res["password"];

        if (password_verify($password, $hash)) {
            return true;
        }

        return false;
    }

}
?>