import { Server } from "socket.io";
import { db } from "../Config/db.js";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket) => {

        console.log("Usuário conectado:", socket.id);

        // entrar na sala do chat
        socket.on("join_chat", (chatId) => {
            socket.join(chatId);
            console.log(`Entrou no chat: ${chatId}`);
        });

        // enviar mensagem
        socket.on("send_message", (data) => {
            const { chat_id, sender_id, content } = data;

            // 1. salvar no banco
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

                    const message = {
                        id: result.insertId,
                        chat_id,
                        sender_id,
                        content,
                        created_at: new Date()
                    };

                    // 2. enviar para todos do chat
                    io.to(chat_id).emit("receive_message", message);
                }
            );
        });

        socket.on("disconnect", () => {
            console.log("Usuário desconectado:", socket.id);
        });
    });

    return io;
};