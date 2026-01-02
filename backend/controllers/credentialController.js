import db from "../models/credentialModel.js"
import bCrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";

async function signupController(req, res) {
    const {name, password} = req.body;
    try {
        console.log("passo 1")
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
            console.log("Signup realizado com sucesso");
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
        if (player) {
            const passwordOk = await bCrypt.compare(password, player.password);
            if (passwordOk) {
                const jsonwebtoken = jwt.sign(
                { id: player._id.toString() },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
                );
                console.log(jsonwebtoken);
                res.cookie("jwt", jsonwebtoken, {
                    httpOnly: false, 
                    secure: false,   
                    sameSite: "lax",
                    path: "/", 
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
                });

                return res.status(200).json({ok:true, msg:"Login efetuado com sucesso"});
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