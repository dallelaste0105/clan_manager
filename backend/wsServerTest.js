import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});




wss.on("connection", socket => {
    console.log("Cliente conectado!");

    socket.on("message", data => {
        const objetoRecebido = JSON.parse(data.toString());
        let whoAreYou = "";
        if (objetoRecebido.who == "player") {
            whoAreYou = "player";
        }
        if (objetoRecebido.who == "enemy") {
            whoAreYou = "enemy";
        }
        const broadcastMsg = {
            who: whoAreYou
        };

        wss.clients.forEach(function(client) {
            if (client.readyState === 1) {
                client.send(JSON.stringify(broadcastMsg));
            }
        });
    });

    socket.on("close", () => {
        console.log("Cliente desconectado");
    });
});

server.listen(3000, () => {
    console.log("Run in: http://localhost:3000");
});