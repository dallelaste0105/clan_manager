import { WebSocketServer } from "ws";
import jsonwebtoken from "jsonwebtoken";

//função para pegar o cookie por meio da chave que você passar em name
function getCookie(cookies, name) {
    if (!cookies) return null;
    const match = cookies.split("; ").find(row => row.startsWith(name + "="));
    return match ? match.split("=")[1] : null;
}

//função que é chamada em server.js para estabelecer conexão com o servidor principal
export default function initWebSocket(server) {
    const wss = new WebSocketServer({ server });

    //quando é criada uma conexão, é pego o cookie por meio do parâmetro request que guarda por padrão esse dado
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

        //avisa a todos que uma conexão nova foi feita - avisa que você se conectou a sala
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ userId: socket.user.id, type: "newUser" }));
            }
        });

        //avisa para o front todos os clientes que já estavam conectados antes
        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === 1 && client.user) {
                socket.send(JSON.stringify({ userId: client.user.id, type: "newUser" }));
            }
        });

        //capta qualquer mensagem que venha do front
        socket.on("message", (data) => {
            const messageObject = JSON.parse(data.toString());
            //verifica se a mensagem que veio do front é de que um usuário se moveu
            if (messageObject.type === "move") {
                switch (messageObject.key) {
                    case "KeyA":
                        wss.clients.forEach((client) => {
                        if (client.readyState === 1) {
                            client.send(JSON.stringify({ userId: socket.user.id, type: "move", key:"KeyA"}));
                        }
                        });
                        break;
                    case "KeyS":
                        wss.clients.forEach((client) => {
                        if (client.readyState === 1) {
                            client.send(JSON.stringify({ userId: socket.user.id, type: "move", key:"KeyS"}));
                        }
                        });
                        break;
                    case "KeyD":
                        wss.clients.forEach((client) => {
                        if (client.readyState === 1) {
                            client.send(JSON.stringify({ userId: socket.user.id, type: "move", key:"KeyD"}));
                        }
                        });
                        break;
                    case "KeyW":
                        wss.clients.forEach((client) => {
                        if (client.readyState === 1) {
                            client.send(JSON.stringify({ userId: socket.user.id, type: "move", key:"KeyW"}));
                        }
                        });
                        break;
                }
                
            }
        });
        socket.on("close", async () => {
            console.log("Usuário desconectou:", socket.user?.id);

            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({ 
                        userId: socket.user.id, 
                        type: "removeUser"
                    }));
                }
            });

            if (socket.user && socket.user.id) {
                try {
                    const response = await fetch('http://localhost:3000/credential/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            userId: socket.user.id
                        })
                    });
                } catch (error) {
                    console.error("Erro ao notificar API de logout:", error.message);
                }
            }
        });
})}