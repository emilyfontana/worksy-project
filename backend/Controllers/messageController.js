import { db } from "../Config/db.js";

// Retorna todo o histórico de mensagens de um chat.
// A ordenação crescente garante que o frontend receba a conversa
// na sequência correta em que as mensagens foram enviadas
// buscar mensagens de um chat
export const getMessagesByChat = (req, res) => {
    const { chatId } = req.params;

    db.query(
        `
        SELECT *
        FROM messages
        WHERE chat_id = ?
        ORDER BY created_at ASC
        `,
        [chatId],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Erro ao buscar mensagens"
                });
            }

            return res.status(200).json(results);
        }
    );
};

// Recupera uma mensagem específica.
// Útil para futuras funcionalidades como detalhes,
// auditoria, edição ou exclusão de mensagens.
// buscar mensagem por id (opcional, mas útil)
export const getMessageById = (req, res) => {
    const { id } = req.params;

    db.query(
        `
        SELECT *
        FROM messages
        WHERE id = ?
        `,
        [id],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Erro ao buscar mensagem"
                });
            }

            // Evita retornar um objeto vazio quando o registro não existe.
            if (results.length === 0) {
                return res.status(404).json({
                    message: "Mensagem não encontrada"
                });
            }

            return res.status(200).json(results[0]);
        }
    );
};