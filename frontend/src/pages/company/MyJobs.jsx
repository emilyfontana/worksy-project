import React, { useEffect, useState } from "react";
import { ArrowLeft, Users, Eye, Edit3, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getJobsByCompany, deleteJob, getLocalUser } from "../../Services/api";

export default function MyJobs() {
  const navigate = useNavigate();
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // carrega as vagas da empresa logada
  useEffect(() => {
    const fetchVagas = async () => {
      const user = getLocalUser();

      if (!user) {
        setError("usuario nao autenticado");
        setLoading(false);
        return;
      }

      try {
        const jobs = await getJobsByCompany(user.id);
        setVagas(jobs);
      } catch (err) {
        setError(err.message || "erro ao buscar vagas");
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, []);

  // remove a vaga e atualiza a lista
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setVagas(vagas.filter(v => v.id !== id));
    } catch (err) {
      setError(err.message || "erro ao excluir vaga");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 max-w-md mx-auto font-sans pb-20">
      <div className="px-6 pt-12 pb-4 bg-white flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full"><ArrowLeft size={18}/></button>
        <h1 className="text-base font-black text-[#1a233d]">Minhas Vagas</h1>
      </div>

      <div className="p-6 space-y-4">
        {loading && (
          <p className="text-xs text-slate-400 text-center">carregando vagas...</p>
        )}

        {error && (
          <p className="text-xs font-bold text-red-500 text-center">{error}</p>
        )}

        {!loading && !error && vagas.length === 0 && (
          <p className="text-xs text-slate-400 text-center">nenhuma vaga cadastrada ainda</p>
        )}

        {vagas.map(vaga => (
          <div key={vaga.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#1a233d]">{vaga.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${vaga.job_status === 'open' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  ● {vaga.job_status === 'open' ? 'Ativa' : 'Pausada'}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400"><Edit3 size={16}/></button>
                <button onClick={() => handleDelete(vaga.id)} className="p-2 text-red-400"><Trash2 size={16}/></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => navigate(`/company/applicants/${vaga.id}`)}
                className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center"
              >
                <Users size={16} className="text-[#2ecc71] mb-1"/>
                <span className="text-sm font-black">{vaga.candidatos ?? 0}</span>
                <span className="text-[9px] text-slate-400 uppercase">Candidatos</span>
              </button>
              <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                <Eye size={16} className="text-blue-500 mb-1"/>
                <span className="text-sm font-black">{vaga.views ?? 0}</span>
                <span className="text-[9px] text-slate-400 uppercase">Views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}