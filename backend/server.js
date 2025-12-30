import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

dotenv.config();

console.log("Tentando conectar em:", process.env.MONGO_URI);

const app = express();

if (!process.env.MONGO_URI) {
    console.warn("AVISO: .env não encontrado. Usando conexão padrão.");
    process.env.MONGO_URI = "mongodb://localhost:27017/meu_jogo_pixi";
}

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'API Online', message: 'Servidor do Jogo rodando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});