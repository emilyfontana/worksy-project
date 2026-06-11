import { db } from "../Config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {


    try {

        const {
            username,
            email,
            password,
            user_type
        } = req.body;

        if (!username || !email || !password || !user_type) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios"
            });
        }

        if (
            user_type !== "freelancer" &&
            user_type !== "company"
        ) {
            return res.status(400).json({
                message: "Tipo de usuário inválido"
            });
        }

        db.query(
            "SELECT id FROM users WHERE email = ?",
            [email],
            async (err, results) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: "Erro interno do servidor"
                    });
                }

                if (results.length > 0) {
                    return res.status(400).json({
                        message: "Email já cadastrado"
                    });
                }

                const passwordHash = await bcrypt.hash(password, 10);

                db.query(
                    `
                    INSERT INTO users
                    (
                        username,
                        email,
                        password_hash,
                        user_type
                    )
                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        username,
                        email,
                        passwordHash,
                        user_type
                    ],
                    (err, result) => {

                        if (err) {
                            console.error(err);

                            return res.status(500).json({
                                message: "Erro interno do servidor"
                            });
                        }

                        return res.status(201).json({
                            message: "Usuário criado com sucesso",
                            userId: result.insertId
                        });

                    }
                );

            }
        );

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno do servidor"
        });

    }

};

export const login = (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        db.query(
            `
            SELECT *
            FROM users
            WHERE email = ?
            `,
            [email],
            async (err, results) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: "Erro interno do servidor"
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        message: "Email ou senha inválidos"
                    });
                }

                const user = results[0];

                const validPassword = await bcrypt.compare(
                    password,
                    user.password_hash
                );

                if (!validPassword) {
                    return res.status(401).json({
                        message: "Email ou senha inválidos"
                    });
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email, user_type: user.user_type },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );

                return res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        user_type: user.user_type
                    }
                });

            }
        );

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno do servidor"
        });

    }

};

export const me = (req, res) => {

    try {

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
            [req.user.id],
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

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno do servidor"
        });

    }

};