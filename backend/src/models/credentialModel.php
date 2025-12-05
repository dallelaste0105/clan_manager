<?php

class SignupModel {
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
}
?>