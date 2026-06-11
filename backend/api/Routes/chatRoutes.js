const express = require("express");
const router = express.Router();

const chatController = require ("../Controllers/chatController");

// POST /chat/conversa  — cria ou retorna conversa entre dois usuários
router.post("/conversa", chatController.criarOuBuscarConversa);

// GET /chat/conversa/:id  — busca mensagens da conversa
router.get("/conversa/:id",  chatController.getMensagens);
// POST /chat/conversa/:id/mensagem  — envia mensagem (HTTP para v1)
router.post("/conversa/:id/mensagem", chatController.enviarMensagem);

module.exports = router;