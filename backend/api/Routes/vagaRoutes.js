

const express = require("express");
const router = express.Router();

const vagaController = require ("../Controllers/vagaController");

router.get("/:id", vagaController.getVagaID);

router.post("/", vagaController.criarVaga);

router.put("/:id", vagaController.updateVaga);

router.delete("/:id", vagaController.deleteVaga);


module.export = router;
