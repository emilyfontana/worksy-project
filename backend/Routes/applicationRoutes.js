import express from "express";

import {
    createApplication,
    getAllApplications,
    getApplicationsByJob,
    updateApplicationStatus
} from "../Controllers/applicationController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllApplications);

router.get("/job/:jobId", getApplicationsByJob);

router.post(
    "/",
    authMiddleware,
    createApplication
);

router.put(
    "/:id",
    authMiddleware,
    updateApplicationStatus
);

export default router;