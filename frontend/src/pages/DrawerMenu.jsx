import { X, User, Heart, FileText, Wallet, Users, Settings, LogOut } from "lucide-react";

export default function DrawerMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Mudamos de 'fixed' para 'absolute' para ele respeitar a div mãe (o celular)
    <div className="absolute inset-0 z-50 flex">
      
      {/* Backdrop de fundo escurecido - também 'absolute' */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Conteúdo do Drawer - 'absolute' fixado à esquerda da tela do celular */}
      <div className="absolute left-0 top-0 bottom-0 w-[290px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col animate-slide-in z-10">
        
        {/* Topo Verde com dados do Perfil */}
        <div className="bg-[#2ecc71] p-6 pt-12 text-white relative rounded-br-[2rem]">
          <button onClick={onClose} className="absolute right-4 top-10 bg-white/20 p-1.5 rounded-full hover:bg-white/30 text-white">
            <X size={16} />
          </button>

          <div className="w-16 h-16 bg-white/20 border-2 border-white/40 rounded-2xl flex items-center justify-center font-black text-xl mb-4">
            RS
          </div>

          <h3 className="text-lg font-bold leading-tight">Rafael Silva</h3>
          <p className="text-xs text-emerald-100 opacity-90 mt-0.5">Full Stack Developer</p>
          
          <div className="flex gap-3 mt-3 text-[11px] font-medium text-emerald-50">
            <span className="flex items-center gap-0.5">⭐ 4.9</span>
            <span>•</span>
            <span>47 projetos</span>
          </div>
        </div>

        {/* Itens do Menu */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <MenuLink icon={<User size={18}/>} label="Meu Perfil" />
          <MenuLink icon={<Heart size={18}/>} label="Vagas Favoritas" badge={1} />
          <MenuLink icon={<FileText size={18}/>} label="Candidaturas" badge={7} />
          <MenuLink icon={<Wallet size={18}/>} label="Pagamentos" />
          <MenuLink icon={<Users size={18}/>} label="Funcionários" badge={4} />
          
          <div className="border-t border-slate-100 my-4 pt-4" />
          
          <MenuLink icon={<Settings size={18}/>} label="Configurações" variant="neutral" />
          <MenuLink icon={<LogOut size={18}/>} label="Sair" variant="danger" />
        </div>
      </div>
    </div>
  );
}

function MenuLink({ icon, label, badge, variant = "default" }) {
  const textColors = {
    default: "text-[#1a233d] hover:bg-slate-50",
    neutral: "text-slate-400 hover:bg-slate-50",
    danger: "text-red-400 hover:bg-red-50/50"
  };

  const iconColors = {
    default: "text-[#2ecc71]",
    neutral: "text-slate-400",
    danger: "text-red-400"
  };

  return (
    <button className={`w-full flex items-center justify-between p-3.5 rounded-xl transition font-bold text-sm ${textColors[variant]}`}>
      <div className="flex items-center gap-3.5">
        <span className={iconColors[variant]}>{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${variant === 'default' ? 'bg-[#2ecc71]/10 text-[#2ecc71]' : 'bg-slate-100 text-slate-500'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}