import { Link } from "react-router-dom";

export function BottomNav({ active }) {
  return (
    // Altere a div mãe do seu arquivo BottomNav para isso:
<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      {/* Botão Início vai para /home */}
      <Link to="/Home" className={`flex flex-col items-center gap-1 text-[10px] font-bold ${active === 'inicio' ? 'text-[#2ecc71]' : 'text-slate-300'}`}>
        <span className="text-lg">🏠</span>Início
        {active === 'inicio' && <span className="w-1 h-1 bg-[#2ecc71] rounded-full"></span>}
      </Link>

      <Link to="/Search" className={`flex flex-col items-center gap-1 text-[10px] font-bold ${active === 'busca' ? 'text-[#2ecc71]' : 'text-slate-300'}`}>
        <span className="text-lg">🔍</span>Busca
        {active === 'busca' && <span className="w-1 h-1 bg-[#2ecc71] rounded-full"></span>}
      </Link>

      <Link to="/Messages" className={`flex flex-col items-center gap-1 text-[10px] font-bold relative ${active === 'chat' ? 'text-[#2ecc71]' : 'text-slate-300'}`}>
        <span className="text-lg">💬</span>Chat
        <span className="absolute -top-1 right-1 bg-red-500 text-white text-[8px] px-1 rounded-full border border-white">3</span>
        {active === 'chat' && <span className="w-1 h-1 bg-[#2ecc71] rounded-full"></span>}
      </Link>

      <Link to="/Applications" className={`flex flex-col items-center gap-1 text-[10px] font-bold ${active === 'candidaturas' ? 'text-[#2ecc71]' : 'text-slate-300'}`}>
        <span className="text-lg">📋</span>Candidaturas
        {active === 'candidaturas' && <span className="w-1 h-1 bg-[#2ecc71] rounded-full"></span>}
      </Link>
    </div>
  );
}