const getVagaID = async (req, res) => {
    res.json({
        message: "buscar vaga"
    });
};

const criarVaga = async (req, res) => {
    res.json ({
        message : "Criar vaga"
    });
};

const updateVaga = async (req, res) => {
    res.json ({
        message: "atualizar vaga"
    });
};

const deleteVaga = async (req, res) => {
    res.json ({
        message: "deleta vaga"
    
    });
};

module.exports = {
    getVagaID,
    criarVaga,
    updateVaga,
    deleteVaga
}