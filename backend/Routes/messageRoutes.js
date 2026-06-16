import express from "express";

import {
    getMessagesByChat,
    getMessageById
} from "../Controllers/messageController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rotas responsáveis pelo gerenciamento de mensagens
router.get(
    "/chat/:chatId",
    authMiddleware,
    getMessagesByChat
);

// Retorna uma mensagem específica
router.get(
    "/:id",
    authMiddleware,
    getMessageById
);

export default router;