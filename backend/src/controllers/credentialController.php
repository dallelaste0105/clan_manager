<?php
require_once __DIR__ . '/../models/credentialModel.php';

class CredentialController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    function signupController() {
        $req = json_decode(file_get_contents("php://input"), true);

        $name = $req["name"] ?? "";
        $password = $req["password"] ?? "";

        if (!$name || !$password) {
            return ["ok" => false, "msg" => "Dados incompletos"];
        }

        $CredentialModel = new CredentialModel($this->db);
        $id = $CredentialModel->signupModel($name, $password);

        return [
            "ok" => true,
            "msg" => "Usuário criado com sucesso",
            "id" => (string)$id
        ];
    }

    function loginController() {
        $req = json_decode(file_get_contents("php://input"), true);

        $name = $req["name"] ?? "";
        $password = $req["password"] ?? "";

        if (!$name || !$password) {
            return ["ok" => false, "msg" => "Dados incompletos"];
        }

        $CredentialModel = new CredentialModel($this->db);
        $ok = $CredentialModel->loginModel($name, $password);

        if ($ok) {
            return ["ok" => true, "msg" => "Login realizado com sucesso"];
        }

        return ["ok" => false, "msg" => "Nome ou senha incorretos"];
    }
}
?>