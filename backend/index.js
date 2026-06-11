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

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Worksy API funcionando"
    });
});

const server = http.createServer(app);

initSocket(server);

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});