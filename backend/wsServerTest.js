const express = require("express");
const http = require("http");
const ws = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

wss.on("connection", socket => {
    console.log("Cliente conectado!");

    socket.on("message", data => {
        const objetoRecebido = JSON.parse(data.toString());
        console.log("Recebi de um cliente:", objetoRecebido);
        const broadcastMsg = {
            tipo: "atualizacao_global",
            texto: `Alguém pressionou a tecla ${objetoRecebido.tecla}`
        };

        wss.clients.forEach(function(client) {
            if (client.readyState === ws.OPEN) {
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