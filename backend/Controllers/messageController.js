import { db } from "../Config/db.js";

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

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Mensagem não encontrada"
                });
            }

            return res.status(200).json(results[0]);
        }
    );
};