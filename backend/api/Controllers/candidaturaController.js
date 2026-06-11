const criarCandidatura = async ( req, res) => {
    const { vaga_id } = req.body;
    const freelancer_id = req.usuario.id;
    res.json({
        message: "criar candidatura"
    });

};

const getCandidaturaID = async (req, res) => {
    const { vaga_id } = req.params;
    const empresa_id = req.usuario.id;

    res.json({
        message: "listar vaga "
    })

}

module.exports = {
    criarCandidatura,
    getCandidaturaID
};