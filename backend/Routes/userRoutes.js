import express from "express";

import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../Controllers/userController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rotas responsáveis pelo gerenciamento de usuários
router.get("/", getAllUsers);

router.get("/:id", getUserById);

// Requer autenticação
router.put("/:id", authMiddleware, updateUser);

// Requer autenticação
router.delete("/:id", authMiddleware, deleteUser);

export default router;