import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import jsonwebtoken from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

wss.on("connection", (socket, request) => {
    const cookies = request.headers.cookie;

    function getCookie(cookies, name) {
        if (!cookies) return null;

        const match = cookies
            .split("; ")
            .find(row => row.startsWith(name + "="));

        return match ? match.split("=")[1] : null;
    }

    const jwt = getCookie(cookies, "jwt");

    if (!jwt) {
        socket.send(JSON.stringify({ erro: "Usuário deve fazer login novamente" }));
        socket.close();
        return;
    }

    let user;
    try {
        user = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    } catch {
        socket.send(JSON.stringify({ erro: "Usuário deve fazer login novamente" }));
        socket.close();
        return;
    }

    socket.user = {
        id: user.id
    };

    console.log("Cliente autenticado:", socket.user.id);

    socket.send(JSON.stringify({ userId :socket.user.id }));

    socket.on("close", () => {
        console.log("Cliente desconectado");
    });
});

server.listen(3000, () => {
    console.log("Run in: http://localhost:3000");
});