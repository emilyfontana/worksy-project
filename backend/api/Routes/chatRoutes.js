const express = require("express");
const router = express.Router();

const chatController = require ("../Controllers/chatController");

router.get("/:id", chatController.getChatID);

module.exports = router;