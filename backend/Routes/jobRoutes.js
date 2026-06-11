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

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.post(
    "/",
    authMiddleware,
    createJob
);

router.put(
    "/:id",
    authMiddleware,
    updateJob
);

router.delete(
    "/:id",
    authMiddleware,
    deleteJob
);

export default router;