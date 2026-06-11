import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, TrendingUp, Heart, MapPin, Clock } from "lucide-react";
import DrawerMenu from "./DrawerMenu";
import { BottomNav } from "./BottomNav";

export default function Home() {
  // Estado para abrir e fechar o menu lateral
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-24 font-sans max-w-md mx-auto">
      
      {/* Menu Lateral (Drawer) controlado pelo estado */}
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white flex items-center justify-between">
        {/* CLIQUE NO AVATAR: Abre o menu lateral */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="w-12 h-12 bg-[#2ecc71] text-white font-bold rounded-full flex items-center justify-center text-lg shadow-sm">
            RS
          </div>
          <div>
            <p className="text-xs text-slate-400">Olá, Rafael ✨</p>
            <h2 className="text-lg font-bold text-[#1a233d] leading-tight">Procurando vagas</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#2ecc71]"></span>
            Freelancer
          </div>
          <button className="p-2.5 bg-slate-50 rounded-full border border-slate-100 text-slate-600 relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* CLIQUE NO BOTÃO MENU: Também abre o menu lateral */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 bg-slate-50 rounded-full border border-slate-100 text-slate-600 hover:bg-slate-100 transition"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Input de Busca */}
      <div className="px-6 mt-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Buscar vagas..." 
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#2ecc71] shadow-sm shadow-slate-100 placeholder-slate-400 text-slate-700"
          />
        </div>
      </div>

      {/* Seção: Vagas Urgentes */}
      <div className="mt-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
              <TrendingUp size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a233d]">Vagas Urgentes</h3>
              <p className="text-[11px] text-slate-400">Contratação imediata</p>
            </div>
          </div>
          <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-1 rounded-lg">
            2 disponíveis
          </span>
        </div>

        {/* Carrossel */}
        <div className="flex gap-4 overflow-x-auto px-6 pb-3 scrollbar-none snap-x">
          <div className="bg-gradient-to-br from-red-50/40 to-white border border-red-100/60 p-5 rounded-3xl min-w-[280px] max-w-[280px] snap-center shadow-sm relative">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-pink-500 rounded-2xl text-white font-bold flex items-center justify-center text-sm relative">
                  AP
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#2ecc71] border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">AppStudio</p>
                  <h4 className="text-sm font-bold text-[#1a233d] leading-snug">Designer UI/UX Mobile</h4>
                </div>
              </div>
              <button className="text-slate-300 bg-white p-2 rounded-full border border-slate-100 shadow-sm">
                <Heart size={14} />
              </button>
            </div>
            <div className="flex gap-4 mt-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><MapPin size={12}/> São Paulo</span>
              <span className="flex items-center gap-1"><Clock size={12}/> 5h</span>
            </div>
            <div className="flex gap-1.5 mt-3">
              {['Figma', 'iOS', 'Android'].map(tag => (
                <span key={tag} className="bg-white border border-slate-100 text-slate-500 text-[10px] px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="border-t border-slate-100/80 mt-4 pt-3 flex justify-between items-center">
              <div>
                <p className="text-[13px] font-black text-[#1a233d]">R$ 5.000–7.000<span className="text-[10px] font-normal text-slate-400">/mês</span></p>
                <span className="text-[9px] text-[#2ecc71] font-medium flex items-center gap-0.5">● Negociável</span>
              </div>
              <span className="bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">Urgente</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="inicio" />
    </div>
  );
}