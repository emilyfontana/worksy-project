import express from "express";

import {
    createChat,
    getChatsByUser,
    getChatById
} from "../Controllers/chatController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// criar chat
router.post("/", authMiddleware, createChat);

// chats do usuário
router.get("/user/:userId", authMiddleware, getChatsByUser);

// chat específico
router.get("/:id", authMiddleware, getChatById);

export default router;