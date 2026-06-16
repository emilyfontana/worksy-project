import { db } from "../Config/db.js";

// Cria um canal de conversa entre empresa e freelancer.
// Caso já exista um chat para a mesma vaga, reutiliza o registro existente
export const createChat = (req, res) => {
    const {
        job_id,
        company_id,
        freelancer_id
    } = req.body;

    // Evita a criação de conversas duplicadas para a mesma negociação
    db.query(
        `
        SELECT * FROM chats
        WHERE job_id = ?
        AND company_id = ?
        AND freelancer_id = ?
        `,
        [job_id, company_id, freelancer_id],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao buscar chat" });
            }

            // Caso o relacionamento já exista, retorna o chat atual
            // em vez de criar um novo registro
            if (results.length > 0) {
                return res.status(200).json(results[0]);
            }

            // Inicia uma nova conversa vinculada à vaga
            db.query(
                `
                INSERT INTO chats
                (job_id, company_id, freelancer_id, is_active)
                VALUES (?, ?, ?, 1)
                `,
                [job_id, company_id, freelancer_id],
                (err, result) => {

                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erro ao criar chat" });
                    }

                    return res.status(201).json({
                        message: "Chat criado com sucesso",
                        chatId: result.insertId
                    });
                }
            );
        }
    );
};

// Retorna todas as conversas nas quais o usuário participa,
// independentemente de atuar como empresa ou freelancer
export const getChatsByUser = (req, res) => {
    const { userId } = req.params;

    db.query(
        `
        SELECT * FROM chats
        WHERE company_id = ?
        OR freelancer_id = ?
        ORDER BY created_at DESC
        `,
        [userId, userId],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao buscar chats" });
            }

            return res.status(200).json(results);
        }
    );
};

// Recupera uma conversa específica para exibição de histórico
// e carregamento das mensagens associadas
export const getChatById = (req, res) => {
    const { id } = req.params;

    db.query(
        `
        SELECT * FROM chats
        WHERE id = ?
        `,
        [id],
        (err, results) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao buscar chat" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Chat não encontrado" });
            }

            return res.status(200).json(results[0]);
        }
    );
};