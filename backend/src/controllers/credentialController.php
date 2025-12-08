<?php
    require_once __DIR__ . '/../models/credentialModel.php';

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

            $CredentialModel = new CredentialModel($this->db);
            $CredentialModel->signupModel($name, $password);

            echo json_encode(["ok" => true, "id" => (string)$id]);
        }

        function loginController(){
            $req = json_decode(file_get_contents("php://input"), true);

            $name = $req["name"] ?? "";
            $password = $req["password"] ?? "";

            if (!$name || !$password) {
                return ["ok" => false, "msg" => "Dados incompletos"];
            }

            $CredentialModel = new CredentialModel($this->db);
            $modelRes = $CredentialModel->loginModel($name, $password);

            if ($modelRes === true) {
                return ["ok" => true, "msg" => "Login realizado com sucesso"];
            }

            return ["ok" => false, "msg" => "Nome ou senha incorretos"];
        }
    }
?>