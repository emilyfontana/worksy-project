import React, { useState } from "react";
import { ChevronLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createJob, getLocalUser } from "../../Services/api";

export default function CreateJob() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    titulo: "", categoria: "", modalidade: "", localizacao: "",
    salarioMin: "", salarioMax: "", salarioNegocivel: false,
    urgente: false, descricao: "", tecnologias: []
  });
  
  const [currentTech, setCurrentTech] = useState("");

  const categorias = ["Frontend", "Backend", "Mobile", "Design UI/UX", "Full Stack"];
  const modalidades = ["Freelancer", "PJ", "CLT"];
  const locais = ["Remoto", "São Paulo", "Híbrido"];

  const handleAddTech = () => {
    if (currentTech.trim() && !formData.tecnologias.includes(currentTech.trim())) {
      setFormData({ ...formData, tecnologias: [...formData.tecnologias, currentTech.trim()] });
      setCurrentTech("");
    }
  };

  // envia a vaga para o backend
  const handlePublish = async () => {
    const user = getLocalUser();

    if (!user) {
      setError("usuario nao autenticado");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // monta o orcamento a partir do salario minimo informado
      const budget = formData.salarioMin
        ? Number(formData.salarioMin)
        : (formData.salarioMax ? Number(formData.salarioMax) : 0);

      await createJob({
        company_id: user.id,
        title: formData.titulo,
        job_description: formData.descricao,
        category: formData.categoria,
        budget,
        job_location: formData.localizacao,
        urgent: formData.urgente
      });

      alert("Vaga publicada com sucesso!");
      navigate("/company/my-jobs");
    } catch (err) {
      setError(err.message || "erro ao publicar vaga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col relative font-sans pb-24">
      {/* Header Multistep */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-slate-100">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
          className="p-2 text-slate-600 bg-slate-50 rounded-full hover:bg-slate-100"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black text-[#1a233d]">Criar Nova Vaga</h2>
          <span className="text-[10px] font-bold text-slate-400">Etapa {step} de 3</span>
        </div>
        <button onClick={() => navigate(-1)} className="p-2 text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full h-1 bg-slate-100 flex">
        <div className={`h-full bg-[#2ecc71] transition-all duration-300 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`} />
      </div>

      {/* Conteúdo do Formulário */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {step === 1 && (
          <>
            <div>
              <h3 className="text-base font-black text-[#1a233d]">Informações básicas</h3>
              <p className="text-xs text-slate-400">Defina o título e o tipo da vaga</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Título da Vaga *</label>
              <input 
                type="text" 
                placeholder="Ex: Desenvolvedor React Senior"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                className="w-full p-3.5 border-2 border-slate-100 rounded-2xl font-semibold text-sm focus:border-[#2ecc71] focus:outline-none transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Categoria *</label>
              <div className="flex flex-wrap gap-2">
                {categorias.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({...formData, categoria: cat})}
                    className={`px-4 py-2 rounded-full font-bold text-xs transition ${formData.categoria === cat ? 'bg-[#2ecc71] text-white' : 'bg-slate-50 text-slate-500'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <h3 className="text-base font-black text-[#1a233d]">Local e remuneração</h3>
              <p className="text-xs text-slate-400">Onde é e quanto paga</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Localização *</label>
              <div className="flex flex-wrap gap-2">
                {locais.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setFormData({...formData, localizacao: loc})}
                    className={`px-4 py-2 rounded-full font-bold text-xs transition ${formData.localizacao === loc ? 'bg-[#2ecc71] text-white' : 'bg-slate-50 text-slate-500'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <h3 className="text-base font-black text-[#1a233d]">Descrição</h3>
              <p className="text-xs text-slate-400">Conte mais sobre o projeto</p>
            </div>
            <textarea 
              rows={4}
              placeholder="Descreva as responsabilidades..."
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              className="w-full p-4 border-2 border-slate-100 rounded-2xl font-semibold text-sm focus:outline-none focus:border-[#2ecc71] resize-none"
            />
          </>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="px-6 pb-2">
          <p className="text-xs font-bold text-red-500 text-center">{error}</p>
        </div>
      )}

      {/* Botões Fixos de Ação */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-50 flex justify-center">
        {step < 3 ? (
          <button 
            onClick={() => setStep(step + 1)}
            className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white py-4 rounded-2xl font-black text-sm transition"
          >
            Próximo →
          </button>
        ) : (
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="w-full bg-[#1a233d] hover:bg-[#111728] text-white py-4 rounded-2xl font-black text-sm transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
          >
            {loading ? "Publicando..." : "✓ Publicar Vaga"}
          </button>
        )}
      </div>
    </div>
  );
}