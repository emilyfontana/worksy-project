import express from "express";

import {
    createChat,
    getChatsByUser,
    getChatById
} from "../Controllers/chatController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rotas responsáveis pelo gerenciamento de conversas entre usuários
router.post("/", authMiddleware, createChat);

router.get(
    "/user/:userId",
    authMiddleware,
    getChatsByUser
);

// Retorna os dados de uma conversa específica
router.get(
    "/:id",
    authMiddleware,
    getChatById
);
// criar chat
router.post("/", authMiddleware, createChat);

// chats do usuário
router.get("/user/:userId", authMiddleware, getChatsByUser);

// chat específico
router.get("/:id", authMiddleware, getChatById);

export default router;