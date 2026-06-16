import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, Heart } from "lucide-react"
import { getJobById, createApplication, getLocalUser } from "../Services/api"

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = getLocalUser()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [message, setMessage] = useState('')

  // carrega os dados da vaga pelo id da url
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id)
        setJob(data)
      } catch (err) {
        console.error('erro ao buscar vaga:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  // envia candidatura para a vaga
  const handleApply = async () => {
    if (!user) { navigate('/'); return }
    setApplying(true)
    setMessage('')
    try {
      await createApplication(job.id, user.id, '')
      setMessage('candidatura enviada com sucesso!')
    } catch (err) {
      setMessage(err.message || 'erro ao enviar candidatura')
    } finally {
      setApplying(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-sm text-slate-400">Carregando...</div>
  if (!job) return <div className="min-h-screen bg-white flex items-center justify-center text-sm text-slate-400">Vaga não encontrada.</div>

  return (
    <div className="min-h-screen bg-white pb-6 font-sans">
      <div className="px-6 pt-12 pb-4 bg-white border-b border-slate-50 flex items-center justify-between sticky top-0 z-10">
        <Link to="/home" className="p-2 bg-slate-50 rounded-full text-slate-400"><ChevronLeft size={18} /></Link>
        <h1 className="text-sm font-bold text-[#1a233d]">Detalhes da Vaga</h1>
        <button className="p-2 bg-slate-50 rounded-full text-slate-300"><Heart size={18} /></button>
      </div>

      <div className="px-6 mt-6 space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center text-lg shadow-md mb-3">
            {job.title.slice(0, 2).toUpperCase()}
          </div>
          <p className="text-xs font-semibold text-slate-400">{job.category || 'Geral'}</p>
          <h2 className="text-lg font-black text-[#1a233d] mt-1">{job.title}</h2>
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full mt-2 border border-slate-100 ${job.urgent ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-500'}`}>
            {job.urgent ? 'Urgente' : 'Freelancer'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 uppercase">📍 Localização</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1">{job.job_location || 'Remoto'}</p>
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 uppercase">💰 Budget</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1">R$ {Number(job.budget).toLocaleString('pt-BR')}</p>
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 uppercase">💼 Status</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1 capitalize">{job.job_status}</p>
          </div>
          <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
            <span className="text-[10px] font-bold text-slate-300 uppercase">🕒 Publicado</span>
            <p className="text-xs font-bold text-[#1a233d] mt-1">{new Date(job.created_at).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[#1a233d] mb-2">Sobre a Vaga</h3>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50/40 border border-slate-100 p-4 rounded-2xl">{job.job_description}</p>
        </div>

        {message && (
          <div className={`text-sm px-4 py-3 rounded-2xl ${message.includes('sucesso') ? 'bg-emerald-50 text-[#2ecc71]' : 'bg-red-50 text-red-500'}`}>
            {message}
          </div>
        )}

        {/* botão de candidatura só aparece para freelancers em vagas abertas */}
        {user?.user_type === 'freelancer' && job.job_status === 'open' && (
          <button onClick={handleApply} disabled={applying}
            className="w-full bg-[#2ecc71] text-white font-semibold py-4 rounded-2xl shadow-lg hover:bg-[#27ae60] transition disabled:opacity-60">
            {applying ? 'Enviando...' : 'Candidatar-se'}
          </button>
        )}
      </div>
    </div>
  )
}