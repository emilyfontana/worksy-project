//criar conversa
// listar conversa

const criarOuBuscarConversa = async (req, res) => {
    const { usuario2_id } = req.body;
    const usuario1_id = req.usuario.id;

    res.json({
        message : "listar conv"
    })


};

// GET /chat/conversa/:id  — busca mensagens de uma conversa
const getMensagens = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario.id;


    res.json({

        message: "listar msg"

    });

};


const enviarMensagem = async (req, res) => {
    const { id } = req.params;
    const { mensagem } = req.body;
    const remetente_id = req.usuario.id;

    res.json({
      mensagem: "Mensagem enviada",
      
    });
  
};

module.exports = { criarOuBuscarConversa, getMensagens, enviarMensagem };
