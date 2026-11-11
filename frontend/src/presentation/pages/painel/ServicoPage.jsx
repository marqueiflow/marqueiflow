// AJ-03 — Ajustes › Serviço: novo (/novo) ou editar (/:id). Só a tela; dados de exemplo do Figma.
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ServicoForm } from "@/presentation/components/servicos/ServicoForm";
import { ExcluirServicoSheet } from "@/presentation/components/servicos/ExcluirServicoSheet";

// Exemplo até existir back-end: todo serviço abre como no Figma (15b).
const EXEMPLO = { nome: "Sobrancelha na navalha", preco: "25" };

export default function ServicoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const voltar = () => navigate("/painel/ajustes/servicos");
  const [excluindo, setExcluindo] = useState(false);

  if (id === "novo") {
    return <ServicoForm onBack={voltar} onSave={voltar} />;
  }

  // Excluir pede confirmação (modal) antes de voltar para a lista.
  return (
    <>
      <ServicoForm
        key={id}
        titulo="Editar serviço"
        submitLabel="Salvar alterações"
        inicial={EXEMPLO}
        onBack={voltar}
        onSave={voltar}
        onExcluir={() => setExcluindo(true)}
      />
      <ExcluirServicoSheet
        open={excluindo}
        nome={EXEMPLO.nome}
        onClose={() => setExcluindo(false)}
        onConfirmar={voltar}
      />
    </>
  );
}
