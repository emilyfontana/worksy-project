import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { BottomNav } from "./BottomNav";
import { useEffect, useState } from "react";
import {
  getChatsByUser,
  getLocalUser
} from "../Services/api";

export default function Messages() {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const user = getLocalUser();

        if (!user) return;

        const data = await getChatsByUser(user.id);

        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadChats();
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-24 font-sans max-w-md mx-auto">

      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black text-[#1a233d]">
            Mensagens
          </h1>
        </div>

        <button className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-600">
          <Menu size={18} />
        </button>
      </div>

      {/* Lista de Conversas */}
      <div className="px-6 mt-4 space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-slate-300 cursor-pointer"
          >
            <div>
              <h3 className="text-sm font-bold">
                Chat #{chat.id}
              </h3>

              <p className="text-xs text-slate-400">
                Clique para abrir a conversa
              </p>
            </div>
          </div>
        ))}

        {chats.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            Nenhuma conversa encontrada
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}