import { Link } from "react-router-dom";
import { ChevronLeft, Heart, MapPin, DollarSign, Briefcase, Clock, Star } from "lucide-react";

export default function JobDetails() {
  return (
    <div className="min-h-screen bg-white pb-6 font-sans">
      {/* Header Fixo da Vaga */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-10">
        <Link to="/busca" className="p-2 bg-slate-50 rounded-full text-slate-400"><ChevronLeft size={18} /></Link>
        <h1 className="text-sm font-bold text-[#1a233d]">Detalhes da Vaga</h1>
        <button className="p-2 bg-slate-50 rounded-full text-slate-300"><Heart size={18} /></button>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {/* Bloco Central do Empregador */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center text-lg shadow-md mb-3 relative">
            TE
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2ecc71] border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold">✓</span>
          </div>
          <p className="text-xs font-semibold text-slate-400 flex items-center gap-1">TechNova <span className="text-amber-500 flex items-center font-bold">⭐ 4.9</span></p>
          <h2 className="text-lg font-black text-[#1a233d] mt-1">Desenvolvedor React Senior</h2>
          <span className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full mt-2">Freelancer</span>
        </div>

        {/* Grid de Atributos Chave */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1">📍 Localização</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1">Remoto</p>
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1">💰 Salário</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1 leading-tight">R$ 8.000–12.000/mês</p>
            <span className="text-[9px] text-slate-400 font-medium">● Fixo</span>
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1">💼 Modalidade</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1">Freelancer</p>
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1">🕒 Publicado</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1">Há 2h</p>
          </div>
        </div>

        {/* Tecnologias Requeridas */}
        <div>
          <h3 className="text-xs font-bold text-[#1a233d] mb-2.5">Tecnologias</h3>
          <div className="flex gap-2">
            {["React", "TypeScript", "GraphQL"].map(tech => (
              <span key={tech} className="bg-indigo-50/30 text-indigo-600 border border-indigo-100/40 text-xs font-medium px-4 py-2 rounded-full">{tech}</span>
            ))}
          </div>
        </div>

        {/* Descrição do Projeto */}
        <div>
          <h3 className="text-xs font-bold text-[#1a233d] mb-2">Sobre a Vaga</h3>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50/40 border border-slate-100 p-4 rounded-2xl">
            Projeto SaaS B2B de 6 meses usando React 18, TypeScript, GraphQL e Tailwind. Time ágil de alto nível técnico.
          </p>
        </div>

        {/* Avaliações e Depoimentos */}
        <div>
          <h3 className="text-xs font-bold text-[#1a233d] mb-3">Avaliações da Empresa</h3>
          <div className="border border-slate-100 p-4 rounded-2xl space-y-3 shadow-sm shadow-slate-100/50">
            <div className="flex justify-between items-center">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#1a233d]">4.9</span>
                <div className="flex text-amber-400 text-xs">★★★★☆</div>
                <span className="text-[10px] text-slate-300 ml-1">127 avaliações</span>
              </div>
              <span className="bg-emerald-50 text-[#2ecc71] text-[9px] font-bold px-2 py-1 rounded-lg border border-emerald-100/40">✓ Verificada</span>
            </div>
            <p className="text-[11px] text-slate-400 italic leading-relaxed">
              "Excelente ambiente de trabalho, equipe colaborativa e projetos desafiadores. Pagamentos sempre em dia."
            </p>
            <p className="text-[10px] text-slate-300 font-medium text-right">— Ana Costa, Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}