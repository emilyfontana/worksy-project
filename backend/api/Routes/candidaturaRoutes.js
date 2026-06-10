const express = require("express");

const router = express.Router(); //verificar se há necessidade de manter 

const candidaturaController = require ("../Controllers/candidaturaController");

router.post("/", candidaturaController.criarCandidatura);

router.get("/:id", candidaturaController.getCandidaturaID);


module.exports = router;
