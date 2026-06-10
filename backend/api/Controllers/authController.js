// criar as funções que executa 

// login()
// cadastrar()

const cadastro = async (req, res) => {
        res.json({
            message: "Cadastro iniciando"
        });

        //depois fazer tratamento de erro com try catch

};

const login = async (req, res) => {
    res.json({
        message: "login iniciado"
    });
};

module.exports = {
    cadastro,
    login
};
