import { db } from "../Config/db.js";

// Cria uma candidatura já com status inicial "pending".
// A regra de negócio que impede candidaturas duplicadas é garantida pelo banco
// através da constraint UNIQUE(job_id, freelancer_id)
export const createApplication = (req, res) => {

    const {
        job_id,
        freelancer_id,
        cover_letter
    } = req.body;

    db.query(
        `
        INSERT INTO applications
        (
            job_id,
            freelancer_id,
            cover_letter,
            application_status
        )
        VALUES (?, ?, ?, 'pending')
        `,
        [
            job_id,
            freelancer_id,
            cover_letter
        ],
        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        message: "Você já se candidatou para esta vaga"
                    });
                }

                console.error(err);

                return res.status(500).json({
                    message: "Erro ao criar candidatura"
                });
            }

            return res.status(201).json({
                message: "Candidatura enviada com sucesso",
                applicationId: result.insertId
            });

        }
    );

};

// Retorna todas as candidaturas cadastradas,
// priorizando as mais recentes para facilitar consultas administrativas
export const getAllApplications = (req, res) => {

    db.query(
        `
        SELECT *
        FROM applications
        ORDER BY created_at DESC
        `,
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao buscar candidaturas"
                });
            }

            return res.status(200).json(results);

        }
    );

};

// Recupera todas as candidaturas vinculadas a uma vaga específica
// Utilizado principalmente para que empresas visualizem seus candidatos
export const getApplicationsByJob = (req, res) => {

    const { jobId } = req.params;

    db.query(
        `
        SELECT *
        FROM applications
        WHERE job_id = ?
        `,
        [jobId],
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao buscar candidaturas"
                });
            }

            return res.status(200).json(results);

        }
    );

};

// Atualiza o ciclo de vida da candidatura,
// permitindo sua aprovação, rejeição ou manutenção como pendente
export const updateApplicationStatus = (req, res) => {

    const { id } = req.params;

    const {
        application_status
    } = req.body;

    db.query(
        `
        UPDATE applications
        SET application_status = ?
        WHERE id = ?
        `,
        [
            application_status,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Erro ao atualizar candidatura"
                });
            }

            return res.status(200).json({
                message: "Status atualizado com sucesso"
            });

        }
    );

};