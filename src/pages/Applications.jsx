import { Menu } from "lucide-react";
import { BottomNav } from "./BottomNav";

export default function Applications() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-24 font-sans max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white flex items-center justify-between">
        <h1 className="text-xl font-black text-[#1a233d]">Candidaturas</h1>
        <button className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-600"><Menu size={18} /></button>
      </div>

      {/* Grid de Sumários */}
      <div className="grid grid-cols-3 gap-3 px-6 mt-4">
        <div className="bg-amber-50/40 border border-amber-100/70 p-3 rounded-2xl text-center">
          <span className="block text-xl font-black text-amber-500">3</span>
          <span className="text-[9px] text-amber-600 font-bold">Em Análise</span>
        </div>
        <div className="bg-emerald-50/40 border border-emerald-100/70 p-3 rounded-2xl text-center">
          <span className="block text-xl font-black text-[#2ecc71]">2</span>
          <span className="text-[9px] text-emerald-600 font-bold">Aprovadas</span>
        </div>
        <div className="bg-red-50/40 border border-red-100/70 p-3 rounded-2xl text-center">
          <span className="block text-xl font-black text-red-400">2</span>
          <span className="text-[9px] text-red-500 font-bold">Rejeitadas</span>
        </div>
      </div>

      {/* Filtros Pílula horizontais */}
      <div className="flex gap-2 overflow-x-auto px-6 mt-5 scrollbar-none">
        {["Todas", "Em Análise", "Aprovadas", "Rejeitadas"].map((f, idx) => (
          <span key={f} className={`text-xs font-bold px-4 py-2 rounded-full border cursor-pointer whitespace-nowrap ${idx === 0 ? "bg-[#1a233d] text-white border-transparent" : "bg-white text-slate-400 border-slate-100"}`}>{f}</span>
        ))}
      </div>

      {/* Seções de Listas */}
      <div className="px-6 mt-6 space-y-6">
        <h3 className="text-xs font-bold text-slate-400 mb-[-8px]">7 candidaturas</h3>
        
        {/* Bloco: Em Análise */}
        <div className="space-y-3">
          <span className="block text-[10px] font-black text-amber-500 tracking-wider uppercase">Em Análise (3)</span>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-3 items-center shadow-sm">
            <div className="w-10 h-10 bg-amber-500 text-white font-bold rounded-xl flex items-center justify-center text-xs">MA</div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-[#1a233d]">Dev Mobile React Native</h4>
              <p className="text-[10px] text-slate-400">MoveApp • R$ 7–10k</p>
            </div>
            <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-2 py-1 rounded-md">Em Análise</span>
          </div>
        </div>

        {/* Bloco: Aprovadas */}
        <div className="space-y-3">
          <span className="block text-[10px] font-black text-[#2ecc71] tracking-wider uppercase">Aprovadas (2)</span>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-3 items-center shadow-sm">
            <div className="w-10 h-10 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center text-xs">TE</div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-[#1a233d]">Desenvolvedor React Senior</h4>
              <p className="text-[10px] text-slate-400">TechNova • R$ 8–12k</p>
            </div>
            <span className="bg-emerald-50 text-[#2ecc71] text-[9px] font-bold px-2 py-1 rounded-md">Aprovada</span>
          </div>
        </div>
      </div>

      <BottomNav active="candidaturas" />
    </div>
  );
}