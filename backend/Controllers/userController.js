import { db } from "../Config/db.js";

// Retorna uma visão resumida dos usuários cadastrados.
// Utilizado principalmente para listagens, evitando expor
// informações mais sensíveis ou desnecessárias do perfil.
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

// Retorna os dados completos de um usuário específico.
// Essa rota funciona como consulta de perfil individual.
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

            // Garante uma resposta clara quando o ID informado
            // não corresponde a nenhum usuário cadastrado.
            if (results.length === 0) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.status(200).json(results[0]);

        }
    );

};

// Atualiza informações complementares do perfil.
// Os campos principais de autenticação permanecem isolados
// das edições comuns realizadas pelo usuário.
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

// Remove permanentemente um usuário do sistema.
// A validação de affectedRows evita informar sucesso
// quando o registro não existe no banco.
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