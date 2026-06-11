import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ChevronLeft, User, Briefcase, Check } from "lucide-react"
import { register, login } from "../Services/api"

export default function RegisterFreelancer() {
  const navigate = useNavigate()
  const [role, setRole] = useState("freelancer")
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // cadastra o usuário e já faz login automaticamente
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ username, email, password, user_type: role === 'empresa' ? 'company' : 'freelancer' })
      await login(email, password)
      navigate('/home')
    } catch (err) {
      setError(err.message || 'erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a233d] flex flex-col justify-between font-sans">
      <div className="px-6 pt-12 pb-6 flex items-center relative text-white">
        <Link to="/" className="absolute left-6 p-2 bg-white/10 rounded-full text-white">
          <ChevronLeft size={18} />
        </Link>
        <div className="w-full text-center">
          <h1 className="text-lg font-bold">Criar conta</h1>
          <p className="text-xs text-slate-400 mt-0.5">Escolha como deseja usar a plataforma</p>
        </div>
      </div>

      <form onSubmit={handleRegisterSubmit} className="bg-white rounded-t-[2.5rem] flex-1 px-6 pt-8 pb-6 flex flex-col justify-between">
        <div className="space-y-5">
          <span className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-[-4px]">Você é...</span>

          <div className="grid grid-cols-2 gap-4">
            <div onClick={() => setRole("freelancer")}
              className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center gap-2 cursor-pointer transition relative ${role === "freelancer" ? "border-[#2ecc71] bg-emerald-50/10" : "border-slate-100 bg-white"}`}>
              <div className={`p-2.5 rounded-xl ${role === "freelancer" ? "bg-[#2ecc71] text-white" : "bg-slate-100 text-slate-400"}`}>
                <User size={18} />
              </div>
              <span className="text-xs font-bold text-[#1a233d]">Freelancer</span>
              <p className="text-[10px] text-slate-400 leading-tight">Ofereça seus serviços e encontre projetos</p>
              {role === "freelancer" && <div className="absolute -bottom-1.5 bg-[#2ecc71] text-white p-0.5 rounded-full"><Check size={10} strokeWidth={4} /></div>}
            </div>

            <div onClick={() => setRole("empresa")}
              className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center gap-2 cursor-pointer transition relative ${role === "empresa" ? "border-[#1a233d] bg-slate-50" : "border-slate-100 bg-white"}`}>
              <div className={`p-2.5 rounded-xl ${role === "empresa" ? "bg-[#1a233d] text-white" : "bg-slate-100 text-slate-400"}`}>
                <Briefcase size={18} />
              </div>
              <span className="text-xs font-bold text-[#1a233d]">Empresa</span>
              <p className="text-[10px] text-slate-400 leading-tight">Contrate talentos e publique vagas</p>
              {role === "empresa" && <div className="absolute -bottom-1.5 bg-[#1a233d] text-white p-0.5 rounded-full"><Check size={10} strokeWidth={4} /></div>}
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-2xl">{error}</div>}

          <div>
            <label className="block text-xs font-bold text-[#1a233d] uppercase tracking-wider mb-2">
              {role === "freelancer" ? "Seu nome completo" : "Nome da empresa"}
            </label>
            <input type="text" placeholder={role === "freelancer" ? "Rafael Silva" : "TechNova Ltda"} required
              value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#2ecc71]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a233d] uppercase tracking-wider mb-2">E-mail</label>
            <input type="email" placeholder="seu@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#2ecc71]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1a233d] uppercase tracking-wider mb-2">Senha</label>
            <input type="password" placeholder="Mínimo 8 caracteres" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#2ecc71]"
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button type="submit" disabled={loading}
            className={`w-full text-white font-semibold py-4 rounded-2xl transition shadow-lg disabled:opacity-60 ${role === "freelancer" ? "bg-[#2ecc71] hover:bg-[#27ae60]" : "bg-[#1a233d] hover:bg-[#111827]"}`}>
            {loading ? 'Criando conta...' : `Criar conta como ${role === "freelancer" ? "Freelancer" : "Empresa"}`}
          </button>
          <p className="text-center text-xs text-slate-400">
            Já tem conta? <Link to="/" className="text-[#2ecc71] font-bold hover:underline">Entrar</Link>
          </p>
        </div>
      </form>
    </div>
  )
}