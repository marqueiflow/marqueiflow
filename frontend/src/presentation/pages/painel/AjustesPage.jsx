// AJ-01 — Ajustes (só a tela; dados de exemplo do Figma)
// "Sair" pede confirmação (modal P7) antes de voltar para a tela Entrar.
import { useState } from "react";
import { useNavigate } from "react-router";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { SairDaContaSheet } from "@/presentation/components/ajustes/SairDaContaSheet";
import { SecaoAjustes } from "@/presentation/components/ajustes/SecaoAjustes";
import { IconButton } from "@/presentation/components/ui/IconButton";
import copiarIcon from "@/presentation/assets/icons/copiar-15.svg";

// Exemplo até existir back-end.
const SLUG = "rafabarber";

const copiarLink = async () => {
  try {
    await navigator.clipboard.writeText(`https://marqueiflow.com.br/${SLUG}`);
  } catch {
    // Sem permissão de área de transferência: nada a fazer nesta fase.
  }
};

const ATENDIMENTO = [
  { id: "servicos", label: "Serviços", valor: "3", to: "/painel/ajustes/servicos" },
  { id: "horarios", label: "Horários", valor: "Seg a Sáb, 9h–19h", to: "/painel/ajustes/horarios" },
  { id: "folgas", label: "Folgas e bloqueios", valor: "1 ativa", to: "/painel/ajustes/folgas" },
];

const PAGAMENTO = [
  { id: "pix", label: "Chave Pix", valor: "rafabarber@email.com", to: "/painel/ajustes/pagamento" },
  { id: "sinal", label: "Sinal", valor: "30% em serviços longos", to: "/painel/ajustes/pagamento" },
];

const CONTA = [
  { id: "plano", label: "Plano", valor: "Grátis", to: "/painel/ajustes/plano" },
  { id: "privacidade", label: "Política de privacidade", to: "/privacidade" },
  { id: "termos", label: "Termos de uso", to: "/termos" },
];

export default function AjustesPage() {
  const navigate = useNavigate();
  const [saindo, setSaindo] = useState(false);
  const conta = [
    ...CONTA,
    { id: "sair", label: "Sair", perigo: true, onClick: () => setSaindo(true) },
  ];

  return (
    <PainelLayout aba="ajustes" className="gap-4 pt-4">
      <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink">
        Ajustes
      </h1>

      <section className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 leading-[normal]">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-[17px] font-semibold tracking-[-0.34px] text-surface">
          RB
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="truncate text-[17px] font-semibold tracking-[-0.17px] text-ink">
            Rafa Barber
          </p>
          <p className="truncate text-[13px]">
            <span className="text-ink-2">marqueiflow.com.br/</span>
            <span className="font-semibold text-ink">{SLUG}</span>
          </p>
        </div>
        <IconButton
          icon={copiarIcon}
          iconSize={15}
          label="Copiar link"
          onClick={copiarLink}
          className="border-0 bg-paper"
        />
      </section>

      <SecaoAjustes titulo="Atendimento" itens={ATENDIMENTO} />
      <SecaoAjustes titulo="Pagamento" itens={PAGAMENTO} />
      <SecaoAjustes titulo="Conta" itens={conta} />

      {/* TODO(AJ-01): encerrar a sessão de verdade quando o back-end existir. */}
      <SairDaContaSheet
        open={saindo}
        onClose={() => setSaindo(false)}
        onConfirmar={() => navigate("/entrar")}
      />
    </PainelLayout>
  );
}
