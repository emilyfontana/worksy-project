import React, { useState } from "react";
import { Plus, Menu, Users, Eye, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompanyHome({ onOpenDrawer }) {
  const [activeTab, setActiveTab] = useState("Todas");
  const navigate = useNavigate();

  const tabs = [
    { id: "Todas", label: "Todas", count: 2 },
    { id: "Ativas", label: "Ativas", count: 2, color: "bg-emerald-50 text-emerald-600" },
    { id: "Pausadas", label: "Pausadas", count: 0, color: "bg-amber-50 text-amber-600" },
    { id: "Encerradas", label: "Encerradas", count: 0, color: "bg-slate-50 text-slate-500" },
  ];

  const companyHomeData = [
    {
      id: 1,
      titulo: "Desenvolvedor React Senior",
      categoria: "Frontend",
      status: "Ativas",
      candidatos: 12,
      visualizacoes: 89,
      salario: "R$ 8.000 - 12.000",
      data: "Criado 15 Mai",
    },
    {
      id: 2,
      titulo: "Designer UI/UX Mobile",
      categoria: "Design",
      status: "Ativas",
      candidatos: 8,
      visualizacoes: 42,
      salario: "R$ 5.000 - 7.000",
      data: "Criado 10 Mai",
    }
  ];

  const vagasFiltradas = activeTab === "Todas" 
    ? companyHomeData 
    : companyHomeData.filter(v => v.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] max-w-md mx-auto relative font-sans pb-24">
      
      {/* Header */}
      <div className="p-6 bg-white flex items-center justify-between border-b border-slate-100 pt-12">
        <h1 className="text-xl font-black text-[#1a233d]">Painel da Empresa</h1>
        
        <div className="flex items-center gap-3">
          {/* BOTÃO CRIAR VAGA REDIRECIONANDO PARA A PÁGINA CORRETA */}
          <button 
            onClick={() => navigate("/company/create-job")}
            className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus size={14} strokeWidth={3} />
            Criar Vaga
          </button>
          
          <button 
            onClick={onOpenDrawer} 
            className="p-2 text-slate-600 bg-slate-50 rounded-full hover:bg-slate-100 transition"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Grid de Status resumidos */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {tabs.slice(1).map((tab) => (
          <div key={tab.id} className="bg-white p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm">
            <span className={`text-lg font-black mb-0.5 ${tab.id === 'Ativas' ? 'text-emerald-500' : tab.id === 'Pausadas' ? 'text-amber-500' : 'text-slate-400'}`}>
              {tab.count}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{tab.label}</span>
          </div>
        ))}
      </div>

      {/* Filtros em formato de pílula */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-bold text-xs transition whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#1a233d] text-white"
                : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listagem de Vagas (Rolagem Vertical Fluida) */}
      <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide px-1">
          {vagasFiltradas.length} {vagasFiltradas.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
        </p>
        
        {vagasFiltradas.map((vaga) => (
          <div 
            key={vaga.id} 
            className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col justify-between hover:border-slate-200 transition"
          >
            <div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-black text-sm text-[#1a233d] pr-2 leading-snug">{vaga.titulo}</h3>
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                  ● Ativa
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 mb-4 flex items-center gap-1">
                <Briefcase size={12} /> {vaga.categoria}
              </p>

              {/* Bloco de Métricas Clicável que leva para os candidatos */}
              <div 
                onClick={() => navigate(`/company/applicants/${vaga.id}`)}
                className="grid grid-cols-2 gap-2 bg-slate-50/70 p-3 rounded-2xl mb-4 cursor-pointer hover:bg-slate-100/80 transition"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Users size={10} className="text-emerald-500" /> Candidatos
                  </span>
                  <span className="text-base font-black text-emerald-500 mt-0.5">{vaga.candidatos}</span>
                </div>
                <div className="border-l border-slate-200/80 pl-3 flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Eye size={10} className="text-blue-500" /> Visualizações
                  </span>
                  <span className="text-base font-black text-[#1a233d] mt-0.5">{vaga.visualizacoes}</span>
                </div>
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-1">
              <span className="text-xs font-black text-[#1a233d]">{vaga.salario}<span className="text-[10px] font-normal text-slate-400">/mês</span></span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{vaga.data}</span>
            </div>
          </div>
        ))}

        {vagasFiltradas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400">Nenhuma vaga nesta categoria.</p>
          </div>
        )}
      </div>

    </div>
  );
}