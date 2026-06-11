import express from "express";

import {
    getMessagesByChat,
    getMessageById
} from "../Controllers/messageController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// mensagens de um chat
router.get("/chat/:chatId", authMiddleware, getMessagesByChat);

// mensagem específica
router.get("/:id", authMiddleware, getMessageById);

export default router;