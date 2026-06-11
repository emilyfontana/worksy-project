import { db } from "../Config/db.js";

// Criar chat (ou retornar se já existir)
export const createChat = (req, res) => {
    const {
        job_id,
        company_id,
        freelancer_id
    } = req.body;

    // 1. verificar se já existe chat
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

            // se já existe, retorna ele
            if (results.length > 0) {
                return res.status(200).json(results[0]);
            }

            // 2. cria chat
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

// Buscar chats por usuário
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

// Buscar chat por ID
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