import db from "../models/credentialModel.js"
import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signupController(req, res) {
    const {name, password} = req.body;
    try {
        if (!name || !password) {
            return res.status(500).json({ok:false, msg:"Campos incompletos"});
        }
        const playerAlreadyExists = await db.playerAlreadyExistsModel(name);
        if (playerAlreadyExists) {
            return res.status(500).json({ok:false, msg:"Este jogador já existe"});
        }
        const hashedPassword = await bCrypt.hash(password, 10);
        const signup = await db.signupModel(name, hashedPassword);
        if (signup) {
            return res.status(200).json({ok:true, msg:"Signup feito com sucesso"});
        }
    } catch (error) {
        return res.status(500).json({ok:false, msg:"Erro crítico"});
    }
}

async function loginController(req, res) {
    const {name, password} = req.body;
    try {
        if (!name || !password) {
            return res.status(500).json({ok:false, msg:"Campos incompletos"});
        }
        const player = await db.getPlayer(name);
        if (player.length>0) {
            const passwordOk = await bCrypt.compare(password, player["password"]);
            if (passwordOk) {
                const jsonwebtoken = jwt.sign({id:player["id"]}, process.env.JWT_SECRET, {expiresIn:"7d"});
                return res.status(200).json({ok:true, msg:jsonwebtoken});
            }
            return res.status(500).json({ok:false, msg:"A senha está incorreta"});
        }
        return res.status(500).json({ok:false, msg:"Jogador não encontrado"});
    } catch (error) {
        return res.status(500).json({ok:false, msg:"Erro crítico"});
    }
}

export default {
    signupController,
    loginController
};