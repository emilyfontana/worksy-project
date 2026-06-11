const getVagaID = async (req, res) => {
    const { id } = req.params;
    res.json({
        message: "buscar vaga"
    });
};

const criarVaga = async (req, res) => {
    const { titulo, descricao, salario, modalidade } = req.body;
    const empresa_id = req.usuario.id;
    res.json ({
        message : "Criar vaga"
    });
};

const updateVaga = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, salario, modalidade, status } = req.body;
    const empresa_id = req.usuario.id;
    res.json ({
        message: "atualizar vaga"
    });
};

const deleteVaga = async (req, res) => {
    const { id } = req.params;
    const empresa_id = req.usuario.id;
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