// criar as funções que executa 

// login()
// cadastrar()

const cadastro = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    res.json({
        message: "Cadastro iniciando"
    });

        //depois fazer tratamento de erro com try catch

};

const login = async (req, res) => {
    const { email, senha } = req.body;
    res.json({
        message: "login iniciado"
    });
};

module.exports = {
    cadastro,
    login
};
