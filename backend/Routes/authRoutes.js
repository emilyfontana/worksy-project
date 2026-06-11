import express from "express";

import {
    register,
    login,
    me
} from "../Controllers/authController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rotas responsáveis por autenticação e identificação do usuário
router.post("/register", register);

router.post("/login", login);

// Retorna os dados do usuário autenticado
router.get(
    "/me",
    authMiddleware,
    me
);

export default router;