<?php
    class CredentialController{
        private $db;
        
        public function __construct($db){
            $this->db = $db;
        }

        function signupController(){
            $req = json_decode(file_get_contents("php://input"), true);

            $name = $req["name"] ?? "";
            $password = $req["password"] ?? "";

            if (!$name || !$password) {
                echo json_encode(["ok" => false, "msg" => "Dados incompletos"]);
                return;
            }

            $CredentialModel = new SignupModel($this->db);
            $CredentialModel->signupModel($name, $password);

            echo json_encode(["ok" => true, "id" => (string)$id]);
        }
    }
?>