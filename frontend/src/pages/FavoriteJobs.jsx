import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FavoriteJobs() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-12 font-sans max-w-md mx-auto">
      <div className="px-6 pt-12 pb-4 bg-white flex items-center gap-4 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full border border-slate-100 text-slate-600">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-base font-bold text-[#1a233d]">Vagas Favoritas</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">1 vaga favorita</p>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex justify-between items-start">
          <div className="flex gap-3">
            <div className="w-11 h-11 bg-teal-600 rounded-2xl text-white font-bold flex items-center justify-center text-sm">
              DA
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a233d] leading-snug">Engenheiro Backend Node.js</h4>
              <p className="text-[11px] text-slate-400">DataFlow</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[12px] font-bold text-[#2ecc71]">R$ 9.000–14.000</span>
                <span className="text-[10px] bg-emerald-50 text-[#2ecc71] px-1.5 py-0.5 rounded font-medium">● Negociável</span>
              </div>
            </div>
          </div>
          <button className="text-red-500 bg-red-50 p-2 rounded-full">
            <Heart size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}