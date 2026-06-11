import express from "express";
import cors from "cors";

import 'dotenv/config';
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import jobRoutes from "./Routes/jobRoutes.js";
import applicationRoutes from "./Routes/applicationRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";

import http from "http";
import { initSocket } from "./socket/socket.js";

const app = express();

app.use(cors());
app.use(express.json());

// Registro das rotas da API
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

// Rota de teste da API
app.get("/", (req, res) => {
    res.json({
        message: "Worksy API funcionando"
    });
});

// Cria o servidor HTTP para integração com o Socket.IO
const server = http.createServer(app);

// Inicializa a comunicação em tempo real
const server = http.createServer(app);

initSocket(server);

const PORT = 3000;

// Inicia o servidor da aplicação
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});