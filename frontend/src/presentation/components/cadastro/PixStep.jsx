// ONB-04 — Cadastro 4/4: Pix e sinal (só a tela; sem regra por enquanto)
import { useNavigate } from "react-router";
import { PixCampos } from "@/presentation/components/pagamento/PixCampos";
import { CadastroLayout } from "./CadastroLayout";

export function PixStep() {
  const navigate = useNavigate();

  return (
    <CadastroLayout
      passo={4}
      title="Como você recebe o sinal?"
      description="O cliente paga direto para você. A gente não toca no dinheiro."
      submitLabel="Concluir cadastro"
      onSubmit={() => navigate("/cadastro/pronto")}
      onBack={() => navigate("/cadastro/3")}
      backIcon="18"
    >
      <PixCampos />
    </CadastroLayout>
  );
}
