import * as PIXI from "pixi.js";
import { router } from './routes';
import { initAuthListeners } from './auth';
import PlayerModel from "../src/playerModel";

const playersList: PlayerModel[] = [];

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    router();
    initAuthListeners();
    const token = getCookie("jwt");
    const path = window.location.pathname;

    if (path === '/game' || path === '/') {
        if (token) {
            initGame();
        } else {
            console.log("Aguardando login...");
        }
    }
});

async function initGame() {    
    const game = new PIXI.Application();
    await game.init({
        background:"#21b2bdb4",
        resizeTo:window
    })
    
    const appDiv = document.querySelector('#app'); 
    if(appDiv) appDiv.innerHTML = ''; 
    document.body.appendChild(game.canvas);
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);
    
    ws.addEventListener('open', () => {
        console.log("Conectado ao servidor WebSocket via Proxy!");
    });

    ws.addEventListener('error', (err) => {
        console.error("Erro no WebSocket (Verifique se o Backend está rodando):", err);
    });

    ws.addEventListener('close', () => {
        console.log("Conexão fechada pelo servidor."); 
    });

    document.addEventListener("keydown", (e)=>{
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type:"move", key:e.code.toString() }));
        }
    })

    //lógica geral de recebimento de mensagens vindas do back
    ws.addEventListener("message", async (event) => {
        const objetoRecebido = JSON.parse(event.data);
        
        //verifica se é um novo usuário que entrou na conexão
        if (objetoRecebido.type == "newUser") {
            if (!playersList.find(p => p.playerId === objetoRecebido.userId)) {
                const newPlayer = new PlayerModel(objetoRecebido.userId, 500, 500, game);
                await newPlayer.loadAssets(); 
                newPlayer.drawItSelf();
                playersList.push(newPlayer);
            }
        }

        else if (objetoRecebido.type == "move") {
            const p = playersList.find(pl => pl.playerId == objetoRecebido.userId);
            if (p) {
                switch (objetoRecebido.key) {
                    case "KeyA":
                        p.walk("KeyA")
                        break;
                    case "KeyS":
                        p.walk("KeyS")
                        break;
                    case "KeyD":
                        p.walk("KeyD")
                        break;
                    case "KeyW":
                        p.walk("KeyW")
                        break;
                }
            }
        }

        else if (objetoRecebido.type == "removeUser") {
        const index = playersList.findIndex(pl => pl.playerId == objetoRecebido.userId);
        if (index !== -1) {
            const p = playersList[index];
            p.killItSelf(); 
            playersList.splice(index, 1);
            }
        }
    })
}