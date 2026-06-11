import express from "express";

import {
    register,
    login,
    me
} from "../Controllers/authController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
    "/me",
    authMiddleware,
    me
);

export default router;