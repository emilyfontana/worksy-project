// post login e post cadastro 

// importar express -  gerencia rotas define oq ocrre qnd acessar alguma rota

//criar router 

// importar authcontroller 

// rota de login

// rota de cadastro 

// exporta router 


import express from 'express';
import cors from 'cors';

const express = require("express");
const router = express.Router();

//router agrupa rotas selecionadas (login e cadastro)

const authController = require("../Controllers/authController");

//cadastro do user 


//quando executar POST /AUTH/CADASTRO O EXPRESS CHAMA AUTHCONTOLLER.CADASTRO
router.post("/cadastro", authController.cadastro);



//login

router.post("/login", authController.login);

module.exports = router;

