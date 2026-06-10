const criarCandidatura = async ( req, res) => {
    res.json({
        message: "criar candidatura"
    });

};

const getCandidaturaID = async (req, res) => {
    res.json({
        message: "listar vaga "
    })
}

module.exports = {
    criarCandidatura,
    getCandidaturaID
};