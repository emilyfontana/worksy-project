import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, Briefcase } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Verifica em tempo real se o usuário está navegando nas telas de empresa
  const isCompany = currentPath.startsWith("/company");

  // Configuração dos botões baseada no tipo de usuário logado
  const navItems = isCompany
    ? [
        { path: "/company", label: "Início", icon: <Home size={20} />, badge: false },
        { path: "/company/search", label: "Busca", icon: <Search size={20} />, badge: false },
        { path: "/company/messages", label: "Chat", icon: <MessageSquare size={20} />, badge: 3 },
        { path: "/company/my-jobs", label: "Vagas", icon: <Briefcase size={20} />, badge: false },
      ]
    : [
        { path: "/home", label: "Início", icon: <Home size={20} />, badge: false },
        { path: "/search", label: "Busca", icon: <Search size={20} />, badge: false },
        { path: "/messages", label: "Chat", icon: <MessageSquare size={20} />, badge: 3 },
        { path: "/applications", label: "Vagas", icon: <Briefcase size={20} />, badge: false },
      ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-2.5 px-6 flex justify-between items-center z-45 max-w-md mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-t-3xl">
      {navItems.map((item) => {
        // Define se este botão específico está ativo na URL atual
        const isActive = currentPath === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 relative transition-all duration-200 ${
              isActive ? "text-[#2ecc71] scale-105" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {/* Ícone com Badge de Notificação se houver */}
            <div className="relative p-1">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Label de texto */}
            <span className="text-[10px] font-extrabold tracking-tight">
              {item.label}
            </span>

            {/* Indicador visual de bola ativa embaixo do ícone */}
            {isActive && (
              <span className="w-1 h-1 bg-[#2ecc71] rounded-full mt-0.5 animate-fade-in" />
            )}
          </Link>
        );
      })}
    </div>
  );
}