import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();

  const time = [
    { nome: "Mariana Torres", cargo: "Frontend Developer", proj: "TechNova App", nota: "4.9", bg: "bg-blue-600" },
    { nome: "Lucas Pereira", cargo: "UI/UX Designer", proj: "AppStudio Redesign", nota: "4.7", bg: "bg-pink-500" },
    { nome: "Sofia Alves", cargo: "Backend Developer", proj: "DataFlow API", nota: "4.8", bg: "bg-teal-600" },
    { nome: "Thiago Rocha", cargo: "QA Engineer", proj: "MoveApp v3", nota: "4.6", bg: "bg-orange-500" }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-12 font-sans max-w-md mx-auto">
      <div className="px-6 pt-12 pb-4 bg-white flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-600">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold text-[#1a233d]">Funcionários</h1>
      </div>

      <div className="p-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Colaboradores dos seus projetos</p>
        
        <div className="space-y-3">
          {time.map((colab, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 ${colab.bg} text-white font-bold text-xs rounded-2xl flex items-center justify-center`}>
                  {colab.nome.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1a233d]">{colab.nome}</h4>
                  <p className="text-[11px] text-slate-500">{colab.cargo}</p>
                  <p className="text-[10px] text-slate-400">{colab.proj}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">★ {colab.nota}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}