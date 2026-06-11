import { db } from "../Config/db.js";

// Cria uma nova vaga vinculada a uma empresa.
// Toda vaga nasce com status inicial "open", indicando que está disponível para candidaturas
export const createJob = (req, res) => {

    const {
        company_id,
        title,
        job_description,
        category,
        budget,
        job_location,
        urgent
    } = req.body;

    db.query(
        `
        INSERT INTO jobs
        (
            company_id,
            title,
            job_description,
            category,
            budget,
            job_location,
            urgent,
            job_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, 'open')
        `,
        [
            company_id,
            title,
            job_description,
            category,
            budget,
            job_location,
            urgent
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao criar vaga"
                });
            }

            return res.status(201).json({
                message: "Vaga criada com sucesso",
                jobId: result.insertId
            });

        }
    );

};

// Retorna todas as vagas cadastradas,
// priorizando as mais recentes para exibição no marketplace
export const getAllJobs = (req, res) => {

    db.query(
        `
        SELECT *
        FROM jobs
        ORDER BY created_at DESC
        `,
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao buscar vagas"
                });
            }

            return res.status(200).json(results);

        }
    );

};

// Recupera os detalhes completos de uma vaga específica
export const getJobById = (req, res) => {

    const { id } = req.params;

    db.query(
        `
        SELECT *
        FROM jobs
        WHERE id = ?
        `,
        [id],
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao buscar vaga"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Vaga não encontrada"
                });
            }

            return res.status(200).json(results[0]);

        }
    );

};

// Permite alterar tanto as informações da vaga
// quanto seu estado dentro do fluxo de contratação
export const updateJob = (req, res) => {

    const { id } = req.params;

    const {
        title,
        job_description,
        category,
        budget,
        job_location,
        urgent,
        job_status
    } = req.body;

    db.query(
        `
        UPDATE jobs
        SET
            title = ?,
            job_description = ?,
            category = ?,
            budget = ?,
            job_location = ?,
            urgent = ?,
            job_status = ?
        WHERE id = ?
        `,
        [
            title,
            job_description,
            category,
            budget,
            job_location,
            urgent,
            job_status,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao atualizar vaga"
                });
            }

            return res.status(200).json({
                message: "Vaga atualizada com sucesso"
            });

        }
    );

};

// Remove permanentemente a vaga
// Relacionamentos configurados com ON DELETE CASCADE serão removidos automaticamente
export const deleteJob = (req, res) => {

    const { id } = req.params;

    db.query(
        `
        DELETE FROM jobs
        WHERE id = ?
        `,
        [id],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao excluir vaga"
                });
            }

            return res.status(200).json({
                message: "Vaga removida com sucesso"
            });

        }
    );

};