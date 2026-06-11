import { db } from "../Config/db.js";

export const getAllUsers = (req, res) => {

    db.query(
        `
        SELECT
            id,
            username,
            email,
            user_type,
            city,
            created_at
        FROM users
        `,
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro interno do servidor"
                });
            }

            return res.status(200).json(results);

        }
    );

};

export const getUserById = (req, res) => {

    const { id } = req.params;

    db.query(
        `
        SELECT
            id,
            username,
            email,
            user_type,
            profile_picture,
            bio,
            phone,
            city,
            skills,
            created_at
        FROM users
        WHERE id = ?
        `,
        [id],
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro interno do servidor"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.status(200).json(results[0]);

        }
    );

};

export const updateUser = (req, res) => {

    const { id } = req.params;

    const {
        bio,
        phone,
        city,
        skills,
        profile_picture
    } = req.body;

    db.query(
        `
        UPDATE users
        SET
            bio = ?,
            phone = ?,
            city = ?,
            skills = ?,
            profile_picture = ?
        WHERE id = ?
        `,
        [
            bio,
            phone,
            city,
            JSON.stringify(skills),
            profile_picture,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro interno do servidor"
                });
            }

            return res.status(200).json({
                message: "Perfil atualizado com sucesso"
            });

        }
    );

};

// 🆕 DELETE USER (NOVO)
export const deleteUser = (req, res) => {

    const { id } = req.params;

    db.query(
        `
        DELETE FROM users
        WHERE id = ?
        `,
        [id],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro interno do servidor"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.status(200).json({
                message: "Usuário deletado com sucesso"
            });

        }
    );

};