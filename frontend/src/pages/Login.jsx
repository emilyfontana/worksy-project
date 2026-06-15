import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Zap } from "lucide-react"
import { login } from "../Services/api"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // envia as credenciais para a api e redireciona se der certo
  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/home')
    } catch (err) {
      setError(err.message || 'email ou senha incorretos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a233d] flex flex-col justify-between font-sans">
      <div className="flex flex-col items-center justify-center pt-14 pb-10 text-center px-6">
        <div className="bg-[#2ecc71] p-3 rounded-2xl shadow-[0_0_15px_rgba(46,204,113,0.4)] mb-4">
          <Zap size={28} className="text-white fill-white" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wide">FreelanceHub</h1>
        <p className="text-slate-400 text-sm mt-1">Conectando talentos e empresas</p>
      </div>

      <div className="bg-white rounded-t-[2.5rem] flex-1 px-8 pt-10 pb-8 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a233d]">Bem-vindo de volta</h2>
            <p className="text-sm text-slate-400 mt-1">Entre na sua conta para continuar</p>
          </div>

          {/* exibe erro se o login falhar */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-2xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1a233d] tracking-wider uppercase mb-2">E-mail</label>
              <input type="email" placeholder="seu@email.com" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#2ecc71] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1a233d] tracking-wider uppercase mb-2">Senha</label>
              <input type="password" placeholder="••••••••" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#2ecc71] transition"
              />
            </div>
            {/* desativado enquanto aguarda resposta da api */}
            <button type="submit" disabled={loading}
              className="w-full bg-[#2ecc71] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#27ae60] transition mt-2 disabled:opacity-60">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="relative flex py-5 items-center justify-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-300 uppercase">ou</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <Link to="/register/freelancer"
            className="w-full block text-center border border-slate-200 text-[#1a233d] font-bold py-4 rounded-2xl hover:bg-slate-50 transition">
            Criar conta
          </Link>
        </div>

        <div className="text-center mt-8 text-xs text-slate-400">
          Novo por aqui?{" "}
          <Link to="/register/freelancer" className="text-[#2ecc71] font-bold hover:underline">Cadastre-se grátis</Link>
        </div>
      </div>
    </div>
  )
}