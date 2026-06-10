
const express = require("express");
const router = express.Router();

const usuarioController = require("../Controllers/usuarioController");

router.get("/:id", usuarioController.getUser);
router.put("/:id", usuarioController.updateUser);


module.exports = router;

