import { Server } from "socket.io";
import { db } from "../Config/db.js";

let io;

// Configura o canal de comunicação em tempo real utilizado pelos chats
export const initSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {

        console.log("Usuário conectado:", socket.id);

        // Associa o usuário à sala do chat para que ele receba apenas
        // eventos relacionados àquela conversa específica
        socket.on("join_chat", (chatId) => {
            socket.join(chatId);
            console.log(`Entrou no chat: ${chatId}`);
        });

        // Fluxo principal do chat:
        // recebe a mensagem do cliente, persiste no banco
        // e replica o evento para todos os participantes da sala
        socket.on("send_message", (data) => {

            const {
                chat_id,
                sender_id,
                content
            } = data;

            db.query(
                `
                INSERT INTO messages (chat_id, sender_id, content)
                VALUES (?, ?, ?)
                `,
                [chat_id, sender_id, content],
                (err, result) => {

                    if (err) {
                        console.error(err);
                        return;
                    }

                    // Monta o objeto que será enviado em tempo real,
                    // mantendo consistência entre banco e frontend
                    const message = {
                        id: result.insertId,
                        chat_id,
                        sender_id,
                        content,
                        created_at: new Date()
                    };

                    // Notifica instantaneamente todos os usuários conectados
                    // à mesma conversa, sem necessidade de nova requisição HTTP
                    io.to(chat_id).emit(
                        "receive_message",
                        message
                    );
                }
            );
        });

        // Permite monitorar conexões encerradas e futuras métricas de presença
        socket.on("disconnect", () => {
            console.log(
                "Usuário desconectado:",
                socket.id
            );
        });
    });

    return io;
};