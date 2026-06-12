import React from "react";
import { ArrowLeft, Star, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobApplicants() {
  const navigate = useNavigate();

  const candidatos = [
    { id: 1, nome: "Mariana Torres", cargo: "Frontend Dev", nota: 4.9, avatar: "MT", cor: "bg-blue-600" },
    { id: 2, nome: "Lucas Pereira", cargo: "UI Designer", nota: 4.7, avatar: "LP", cor: "bg-pink-500" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 max-w-md mx-auto font-sans">
      <div className="px-6 pt-12 pb-4 bg-white flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full"><ArrowLeft size={18}/></button>
        <div>
          <h1 className="text-sm font-black text-[#1a233d]">Candidatos</h1>
          <p className="text-[10px] text-slate-400">Dev React Senior</p>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {candidatos.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${c.cor} text-white rounded-2xl flex items-center justify-center font-bold`}>{c.avatar}</div>
              <div>
                <h4 className="text-xs font-bold text-[#1a233d]">{c.nome}</h4>
                <p className="text-[10px] text-slate-400">{c.cargo} • <span className="text-amber-500">★ {c.nota}</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-red-500 bg-red-50 rounded-xl"><XCircle size={18}/></button>
              <button className="p-2 text-[#2ecc71] bg-emerald-50 rounded-xl"><CheckCircle size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}