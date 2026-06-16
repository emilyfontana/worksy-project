import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-12 font-sans max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-600">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold text-[#1a233d]">Meu Perfil</h1>
        <button className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-400">
          <Settings size={18} />
        </button>
      </div>

      {/* Card Principal */}
      <div className="p-6 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#2ecc71] text-white font-bold rounded-2xl flex items-center justify-center text-xl shadow-sm">
            RS
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1a233d]">Rafael Silva</h2>
            <p className="text-xs text-slate-400">Full Stack Developer</p>
            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-0.5 text-amber-500">★ 4.9</span>
              <span>47 projetos</span>
              <span>São Paulo, SP</span>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="flex border-b border-slate-100 mt-6">
          <button className="flex-1 text-center pb-2 text-xs font-bold text-[#2ecc71] border-b-2 border-[#2ecc71]">Sobre</button>
          <button className="flex-1 text-center pb-2 text-xs font-bold text-slate-400">Links</button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-4">
        {/* Bio */}
        <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Bio</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Desenvolvedor Full Stack com 6 anos de experiência. Especializado em React, Node.js e arquitetura cloud. Apaixonado por criar produtos digitais de alto impacto.
          </p>
        </div>

        {/* Habilidades */}
        <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Habilidades</p>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker"].map((tech) => (
              <span key={tech} className="bg-emerald-50/60 border border-emerald-100 text-[#2ecc71] text-[11px] px-3 py-1.5 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-100 p-4 rounded-2xl text-center shadow-sm">
            <h4 className="text-lg font-bold text-[#1a233d]">47</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Projetos</p>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl text-center shadow-sm">
            <h4 className="text-lg font-bold text-[#1a233d]">4.9★</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Avaliação</p>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl text-center shadow-sm">
            <h4 className="text-lg font-bold text-[#1a233d]">98%</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Taxa Conclusão</p>
          </div>
        </div>
      </div>
    </div>
  );
}