// AJ-05 — Ajustes › Pagamento: chave Pix e sinal (só a tela; dados de exemplo do Figma)
// Sem tela própria no Figma: reaproveita os campos do Cadastro 4/4 na moldura de Ajustes › Horários.
import { useNavigate } from "react-router";
import { PixCampos } from "@/presentation/components/pagamento/PixCampos";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";

// Exemplo até existir back-end.
const EXEMPLO = { chave: "rafabarber@email.com", nome: "Rafael Barbosa" };

export default function PagamentoPage() {
  const navigate = useNavigate();
  const voltar = () => navigate("/painel/ajustes");

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton icon={voltarIcon} iconSize={18} label="Voltar" onClick={voltar} />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">Pagamento</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4.5 px-5 py-4">
        <p className="text-sm leading-[1.45] text-ink-2">
          O cliente paga direto para você. A gente não toca no dinheiro.
        </p>
        <PixCampos inicial={EXEMPLO} />
      </main>

      <footer className="sticky bottom-0 bg-paper px-5 pt-3 pb-8.5">
        <Button className="w-full" onClick={voltar}>
          Salvar alterações
        </Button>
      </footer>
    </div>
  );
}
