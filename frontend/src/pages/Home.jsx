import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Bell, Menu, TrendingUp, Heart, MapPin, Clock } from "lucide-react"
import DrawerMenu from "./DrawerMenu"
import { BottomNav } from "./BottomNav"
import { getAllJobs, getLocalUser } from "../Services/api"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const user = getLocalUser()

  // busca as vagas do banco ao carregar a tela
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs()
        setJobs(data)
      } catch (err) {
        console.error('erro ao buscar vagas:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const urgentJobs = jobs.filter((j) => j.urgent)
  const regularJobs = jobs.filter((j) => !j.urgent)

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50/50 pb-24 font-sans max-w-md mx-auto">
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* header com nome do usuário logado */}
      <div className="px-6 pt-12 pb-4 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsMenuOpen(true)}>
          <div className="w-12 h-12 bg-[#2ecc71] text-white font-bold rounded-full flex items-center justify-center text-lg shadow-sm">
            {user?.username?.slice(0, 2).toUpperCase() || 'US'}
          </div>
          <div>
            <p className="text-xs text-slate-400">Olá, {user?.username || 'usuário'} ✨</p>
            <h2 className="text-lg font-bold text-[#1a233d] leading-tight">Procurando vagas</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#2ecc71]"></span>
            {user?.user_type === 'company' ? 'Empresa' : 'Freelancer'}
          </div>
          <button className="p-2.5 bg-slate-50 rounded-full border border-slate-100 text-slate-600 relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="p-2.5 bg-slate-50 rounded-full border border-slate-100 text-slate-600 hover:bg-slate-100 transition">
            <Menu size={18} />
          </button>
        </div>
      </div>

      <div className="px-6 mt-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-slate-300" size={18} />
          <input type="text" placeholder="Buscar vagas..."
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#2ecc71] shadow-sm placeholder-slate-400 text-slate-700"
          />
        </div>
      </div>

      {/* vagas urgentes vindas do banco */}
      {urgentJobs.length > 0 && (
        <div className="mt-8">
          <div className="px-6 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-500/10 rounded-xl text-red-500"><TrendingUp size={16} /></div>
              <div>
                <h3 className="text-sm font-bold text-[#1a233d]">Vagas Urgentes</h3>
                <p className="text-[11px] text-slate-400">Contratação imediata</p>
              </div>
            </div>
            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-1 rounded-lg">{urgentJobs.length} disponíveis</span>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 pb-3 scrollbar-none snap-x">
            {urgentJobs.map((job) => (
              <Link key={job.id} to={`/job/${job.id}`} className="bg-gradient-to-br from-red-50/40 to-white border border-red-100/60 p-5 rounded-3xl min-w-[280px] max-w-[280px] snap-center shadow-sm block">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[11px] text-slate-400">{job.category || 'Geral'}</p>
                    <h4 className="text-sm font-bold text-[#1a233d]">{job.title}</h4>
                  </div>
                  <button className="text-slate-300 bg-white p-2 rounded-full border border-slate-100"><Heart size={14} /></button>
                </div>
                <div className="flex gap-4 mt-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.job_location || 'Remoto'}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> Recente</span>
                </div>
                <div className="border-t border-slate-100/80 mt-4 pt-3 flex justify-between items-center">
                  <p className="text-[13px] font-black text-[#1a233d]">R$ {Number(job.budget).toLocaleString('pt-BR')}</p>
                  <span className="bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase">Urgente</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* todas as vagas */}
      <div className="mt-8 px-6">
        <h3 className="text-sm font-bold text-[#1a233d] mb-4">Todas as vagas</h3>
        {loading && <p className="text-sm text-slate-400 text-center py-8">Carregando vagas...</p>}
        {!loading && jobs.length === 0 && <p className="text-sm text-slate-400 text-center py-8">Nenhuma vaga disponível.</p>}
        <div className="space-y-3">
          {regularJobs.map((job) => (
            <Link key={job.id} to={`/job/${job.id}`} className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-3 items-center shadow-sm block hover:border-slate-200 transition">
              <div className="w-10 h-10 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center text-xs">
                {job.title.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-[#1a233d]">{job.title}</h4>
                <p className="text-[10px] text-slate-400">{job.category} • R$ {Number(job.budget).toLocaleString('pt-BR')}</p>
              </div>
              <span className="text-[10px] text-slate-300 flex items-center gap-1"><MapPin size={10} /> {job.job_location || 'Remoto'}</span>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav active="inicio" />
    </div>
  )
}