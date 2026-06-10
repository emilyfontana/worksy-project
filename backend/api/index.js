const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./Routes/authRoutes");
const usuarioRoutes = require("./Routes/usuarioRoutes");
const vagaRoutes = require("./Routes/vagaRoutes");
const candidaturaRoutes = require("./Routes/candidaturaRoutes");
const chatRoutes = require("./Routes/chatRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

app.use("/users", usuarioRoutes);

app.use("/Vaga", vagaRoutes);

app.use("/candidatura", candidaturaRoutes);

app.use("/chat", chatRoutes);

// teste 
app.get("/", (req, res) => {
    res.json({
        message: "API funcionando!"
    });
});

// Inicialização do servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor rodando");
});