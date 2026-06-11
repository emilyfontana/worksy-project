import jwt from "jsonwebtoken";

// Garante que apenas usuários autenticados possam acessar rotas protegidas,
// validando o JWT recebido e identificando quem está realizando a requisição
const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        // Bloqueia o acesso quando nenhum token é enviado
        if (!authHeader) {
            return res.status(401).json({
                message: "Token não fornecido"
            });
        }

        // Extrai apenas o token do padrão "Bearer TOKEN"
        const token = authHeader.split(" ")[1];

        // Confirma a autenticidade do token e recupera os dados do usuário
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Anexa as informações do usuário à requisição para uso nos controllers
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            "worksy$2026#secure@jwt!key"
        );

        req.user = decoded;

        next();

    } catch (error) {

        // Impede o acesso caso o token seja inválido, expirado ou adulterado
        return res.status(401).json({
            message: "Token inválido"
        });

    }
};

export default authMiddleware;