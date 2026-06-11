
const getUser = async (req, res) => {

    const { id } = req.params;
    res.json({
        message: "buscar usuario"
    });

    //tratametno com try catch
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    res.json({
        message: "atualizar usuario"
    });

    //tratametno com try catch
};



module.exports = {
    getUser,
    updateUser
};
