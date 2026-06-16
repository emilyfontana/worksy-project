import { X, User, Heart, FileText, Wallet, Users, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalUser, logout } from "../Services/api";

export default function DrawerMenu({ isOpen, onClose }) {
  const user = getLocalUser();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute left-0 top-0 bottom-0 w-[290px] max-w-[85vw] bg-white shadow-2xl flex flex-col animate-slide-in z-10">

        {/* HEADER */}
        <div className="bg-[#2ecc71] p-6 pt-12 text-white relative rounded-br-[2rem]">
          <button
            onClick={onClose}
            className="absolute right-4 top-10 bg-white/20 p-1.5 rounded-full"
          >
            <X size={16} />
          </button>

          <div className="w-16 h-16 bg-white/20 border-2 border-white/40 rounded-2xl flex items-center justify-center font-black text-xl mb-4">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <h3 className="text-lg font-bold">{user?.username}</h3>
          <p className="text-xs text-emerald-100">{user?.user_type}</p>
        </div>

        {/* MENU */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">

          <MenuLink to="/profile" icon={<User size={18} />} label="Meu Perfil" onClick={onClose} />
          <MenuLink to="/favorites" icon={<Heart size={18} />} label="Favoritos" onClick={onClose} />
          <MenuLink to="/applications" icon={<FileText size={18} />} label="Candidaturas" onClick={onClose} />
          <MenuLink to="/payments" icon={<Wallet size={18} />} label="Pagamentos" onClick={onClose} />
          <MenuLink to="/employees" icon={<Users size={18} />} label="Funcionários" onClick={onClose} />

          <div className="border-t border-slate-100 my-4 pt-4" />

          <MenuLink to="/settings" icon={<Settings size={18} />} label="Configurações" onClick={onClose} />

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 p-3 text-red-400 font-bold"
          >
            <LogOut size={18} />
            Sair
          </button>

        </div>
      </div>
    </div>
  );
}

function MenuLink({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl text-[#1a233d] hover:bg-slate-50 font-bold text-sm"
    >
      <span className="text-[#2ecc71]">{icon}</span>
      {label}
    </Link>
  );
}