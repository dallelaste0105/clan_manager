import { WebSocketServer } from "ws";
import jsonwebtoken from "jsonwebtoken";

function getCookie(cookies, name) {
    if (!cookies) return null;
    const match = cookies.split("; ").find(row => row.startsWith(name + "="));
    return match ? match.split("=")[1] : null;
}

export default function initWebSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (socket, request) => {
        const jwt = getCookie(request.headers.cookie, "jwt");

        if (!jwt) {
            socket.close();
            return;
        }

        let user;
        try {
            user = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
        } catch (err) {
            socket.close();
            return;
        }

        socket.user = { id: user.id };

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ userId: socket.user.id, msg: "newUser" }));
            }
        });

        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === 1 && client.user) {
                socket.send(JSON.stringify({ userId: client.user.id, msg: "newUser" }));
            }
        });

        socket.on("message", (data) => {
            const messageObject = JSON.parse(data.toString());
            if (messageObject.key === "KeyG") {
                wss.clients.forEach((client) => {
                    if (client.readyState === 1) {
                        client.send(JSON.stringify({ userId: socket.user.id, msg: "move" }));
                    }
                });
            }
        });
    });
}