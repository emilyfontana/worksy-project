import express from "express";

import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} from "../Controllers/jobController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rotas responsáveis pelo gerenciamento de vagas
router.get("/", getAllJobs);

router.get("/:id", getJobById);

// Requer autenticação
router.post(
    "/",
    authMiddleware,
    createJob
);

// Requer autenticação
router.put(
    "/:id",
    authMiddleware,
    updateJob
);

// Requer autenticação
router.delete(
    "/:id",
    authMiddleware,
    deleteJob
);

export default router;