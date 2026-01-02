import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from "http";
import connectDB from './db.js';
import credentialRoute from '../backend/routes/credentialRoute.js';
import initWebSocket from './wsServerTest.js'; 

dotenv.config();

const app = express();

if (!process.env.MONGO_URI) {
    process.env.MONGO_URI = "mongodb://localhost:27017/meu_jogo_pixi";
}

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/credential', credentialRoute);

app.get('/', (req, res) => {
    res.json({ status: 'API Online', message: 'Servidor do Jogo rodando!' });
});

const server = http.createServer(app);
initWebSocket(server); 

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default server;