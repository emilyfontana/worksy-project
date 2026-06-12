import { ArrowLeft, Smartphone, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-12 font-sans max-w-md mx-auto">
      <div className="px-6 pt-12 pb-4 bg-white flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-600">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold text-[#1a233d]">Pagamentos</h1>
      </div>

      {/* Card de Saldo */}
      <div className="px-6 pb-6 bg-white border-b border-slate-100">
        <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl text-center">
          <p className="text-xs text-slate-400">Saldo disponível</p>
          <h2 className="text-2xl font-black text-[#1a233d] mt-1">R$ 5.250,00</h2>
          <button className="w-full mt-4 bg-[#2ecc71] text-white font-bold text-xs py-3 rounded-xl shadow-sm shadow-emerald-200 hover:bg-[#27ae60] transition">
            Sacar
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Métodos de Recebimento */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Métodos de Recebimento</p>
          <div className="space-y-2">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-[#2ecc71] rounded-xl"><Smartphone size={16} /></div>
                <div>
                  <h4 className="text-xs font-bold text-[#1a233d]">PIX</h4>
                  <p className="text-[11px] text-slate-400">rafael@email.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl"><CreditCard size={16} /></div>
                <div>
                  <h4 className="text-xs font-bold text-[#1a233d]">Cartão</h4>
                  <p className="text-[11px] text-slate-400">•••• •••• •••• 4521</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico Recente */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Histórico Recente</p>
          <div className="space-y-2">
            {[
              { empresa: "TechNova", desc: "Projeto", data: "15/05/2025", valor: "R$ 2.500,00", status: "Recebido", cor: "text-emerald-500 bg-emerald-50" },
              { empresa: "DataFlow", desc: "Consultoria", data: "08/05/2025", valor: "R$ 1.800,00", status: "Recebido", cor: "text-emerald-500 bg-emerald-50" },
              { empresa: "MoveApp", desc: "Sprint", data: "30/04/2025", valor: "R$ 3.200,00", status: "Pendente", cor: "text-amber-500 bg-amber-50" },
              { empresa: "CloudBR", desc: "Freelancer", data: "22/04/2025", valor: "R$ 950,00", status: "Recebido", cor: "text-emerald-500 bg-emerald-50" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 text-[#1a233d] font-bold text-xs rounded-xl flex items-center justify-center">
                    {item.empresa.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1a233d]">{item.empresa}</h4>
                    <p className="text-[10px] text-slate-400">{item.desc} • {item.data}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-[#1a233d]">{item.valor}</p>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${item.cor}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}