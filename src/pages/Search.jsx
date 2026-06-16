import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Briefcase, Calendar } from "lucide-react";
import { BottomNav } from "../pages/BottomNav"; // Ajuste o caminho se sua BottomNav estiver em outra pasta

export default function Search() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-24 font-sans max-w-md mx-auto">
      
      {/* Topo / Título */}
      <div className="px-6 pt-12 pb-4 bg-white">
        <h1 className="text-xl font-bold text-[#1a233d]">Buscar Vagas</h1>
        <p className="text-xs text-slate-400 mt-0.5">Encontre a oportunidade perfeita</p>
      </div>

      {/* Barra de Pesquisa com o Ícone Corrigido */}
      <div className="px-6 bg-white pb-4 border-b border-slate-100 flex gap-2">
        <div className="relative flex items-center flex-1">
          {/* Usando o apelido SearchIcon aqui para evitar conflito com o nome da página */}
          <SearchIcon className="absolute left-4 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="React, Node.js, Design..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#2ecc71] text-slate-700 placeholder-slate-400" 
          />
        </div>
        
        {/* Botão de Filtro */}
        <button className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 hover:bg-slate-100 transition">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Resultados de Exemplo */}
      <div className="p-6 space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resultados recentes</p>
        
        {/* Card de Vaga 1 */}
        <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
          <div className="flex gap-3">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl text-white font-bold flex items-center justify-center text-sm">
              NX
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a233d] leading-snug">Desenvolvedor React Front-End</h4>
              <p className="text-[11px] text-slate-400">Nexus Tech</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={12}/> Remoto</span>
            <span className="flex items-center gap-1"><Briefcase size={12}/> PJ</span>
          </div>
        </div>

        {/* Card de Vaga 2 */}
        <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
          <div className="flex gap-3">
            <div className="w-11 h-11 bg-purple-600 rounded-2xl text-white font-bold flex items-center justify-center text-sm">
              LB
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a233d] leading-snug">Desenvolvedor Node.js Backend</h4>
              <p className="text-[11px] text-slate-400">LabCodes</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={12}/> Curitiba - PR</span>
            <span className="flex items-center gap-1"><Briefcase size={12}/> CLT</span>
          </div>
        </div>
      </div>

      {/* Barra de Baixo Ativa na Busca */}
      <BottomNav active="busca" />
    </div>
  );
}