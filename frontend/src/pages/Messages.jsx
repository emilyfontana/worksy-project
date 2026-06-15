import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { BottomNav } from "./BottomNav";

export default function Messages() {
  const navigate = useNavigate();

  const chats = [
    { id: 1, name: "Ana Faria", company: "TechNova", text: "Ótimo! Pode começar na segunda?", time: "10:32", badge: 2, color: "bg-indigo-500", initial: "AF", online: true },
    { id: 2, name: "Bruno Mendes", company: "AppStudio", text: "Portfólio recebido, obrigado!", time: "Ontem", color: "bg-pink-500", initial: "BM" },
    { id: 3, name: "Carla Santos", company: "DataFlow", text: "Entrevista: 5ª feira, 15h", time: "Seg", badge: 1, color: "bg-teal-600", initial: "CS", online: true },
    { id: 4, name: "Diego Lima", company: "MoveApp", text: "Proposta enviada por e-mail", time: "28/04", color: "bg-amber-500", initial: "DL" },
  ];

  return (
 <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-24 font-sans max-w-md mx-auto">
      
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black text-[#1a233d]">Mensagens</h1>
          <span className="bg-[#2ecc71]/10 text-[#2ecc71] text-[10px] font-bold px-2 py-0.5 rounded-full">● 3 novas</span>
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
            // CLIQUE NO CARD: Leva para a tela de chat individual
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm shadow-slate-100/50 hover:border-slate-300 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex gap-3.5 items-center">
              <div className={`w-11 h-11 ${chat.color} text-white font-bold rounded-full flex items-center justify-center text-sm relative`}>
                {chat.initial}
                {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ecc71] border-2 border-white rounded-full"></span>}
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-sm font-bold text-[#1a233d]">{chat.name}</h3>
                  <span className="text-[10px] text-slate-300 font-medium">{chat.company}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{chat.text}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 min-w-[45px]">
              <span className="text-[10px] text-slate-300 font-medium">{chat.time}</span>
              {chat.badge && (
                <span className="bg-[#2ecc71] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {chat.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="chat" />
    </div>
  );
}