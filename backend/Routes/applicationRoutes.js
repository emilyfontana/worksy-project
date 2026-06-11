import express from "express";

import {
    createApplication,
    getAllApplications,
    getApplicationsByJob,
    updateApplicationStatus
} from "../Controllers/applicationController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Rotas responsáveis pelo gerenciamento de candidaturas
router.get("/", getAllApplications);

router.get("/job/:jobId", getApplicationsByJob);

// Requer autenticação
router.post(
    "/",
    authMiddleware,
    createApplication
);

// Requer autenticação
router.put(
    "/:id",
    authMiddleware,
    updateApplicationStatus
);

export default router;