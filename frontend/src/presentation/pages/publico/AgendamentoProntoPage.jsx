// BOOK-05/06 — Confirmação do agendamento (só a tela; dados de exemplo do Figma 04 e 05)
// /:slug/agendar/pronto mostra "aguardando sinal" (04); com ?sinal=nao, "confirmado" (05).
import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { Toast } from "@/presentation/components/ui/Toast";
import { Logo } from "@/presentation/components/ui/Logo";
import { LinksLegais } from "@/presentation/components/legal/LinksLegais";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import checkIcon from "@/presentation/assets/icons/check-28.svg";
import calendarioIcon from "@/presentation/assets/icons/calendario-18.svg";

// Exemplo até existir back-end.
const CHAVE_PIX = "rafabarber@email.com";
const RESUMO = [
  { label: "Serviço", valor: "Corte + barba" },
  { label: "Quando", valor: "Seg 9/11, 17:00" },
  { label: "Onde", valor: "Rafa Barber · Centro" },
];

export default function AgendamentoProntoPage() {
  const [params] = useSearchParams();
  const comSinal = params.get("sinal") !== "nao";
  const [copiado, setCopiado] = useState(false);
  const fecharAviso = useCallback(() => setCopiado(false), []);

  // Copia a chave e mostra o aviso C4 "Chave Pix copiada".
  const copiarChave = async () => {
    try {
      await navigator.clipboard.writeText(CHAVE_PIX);
    } catch {
      // Sem permissão de área de transferência: o aviso aparece mesmo assim nesta fase.
    }
    setCopiado(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className="flex flex-1 flex-col gap-4 px-5 pt-7 leading-[normal]">
        <header className="flex flex-col items-center gap-2.5 pb-2 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-success-soft">
            <img src={checkIcon} alt="" width={28} height={28} />
          </span>
          <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.9px] text-ink">
            {comSinal ? "Horário reservado." : "Horário confirmado."}
          </h1>
          <p className="text-[15px] text-ink-2">
            {comSinal ? "Falta só o sinal para confirmar." : "Te esperamos segunda, às 17:00."}
          </p>
        </header>

        <section className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface p-4.5 text-[15px]">
          {RESUMO.map((r) => (
            <p key={r.label} className="flex justify-between gap-3">
              <span className="text-ink-2">{r.label}</span>
              <span className="font-medium tracking-[-0.15px] text-ink">{r.valor}</span>
            </p>
          ))}
          <hr className="border-line" />
          <p className="flex justify-between gap-3">
            <span className="text-ink-2">Total</span>
            <span className="font-semibold tracking-[-0.15px] text-ink">R$ 60</span>
          </p>
        </section>

        {comSinal ? (
          <section className="flex flex-col gap-2.5 rounded-2xl bg-accent-soft px-4.5 pt-4 pb-4.5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-ink">Sinal via Pix</h2>
              <StatusBadge status="aguardando-sinal" />
            </div>
            <p className="text-[30px] leading-[1.1] font-semibold tracking-[-0.9px] text-ink">
              R$ 18
            </p>
            <div className="flex h-12 items-center justify-between gap-3 rounded-xl bg-surface pr-1 pl-3.5 text-sm">
              <span className="min-w-0 truncate font-medium text-ink">{CHAVE_PIX}</span>
              <button
                type="button"
                onClick={copiarChave}
                className="flex h-11 shrink-0 pressable items-center px-2.5 font-semibold text-accent-strong"
              >
                Copiar
              </button>
            </div>
            <p className="text-[13px] leading-[1.4] text-ink-2">
              O Rafa confirma assim que receber. O restante você paga no dia.
            </p>
          </section>
        ) : (
          <section className="flex items-start gap-2.5 rounded-[14px] border border-line bg-surface px-3.5 py-3">
            <img src={calendarioIcon} alt="" width={18} height={18} className="shrink-0" />
            <p className="min-w-0 flex-1 text-[13px] leading-[1.45] text-ink-2">
              Salve o link desta página: é por ele que você remarca ou cancela, até 2h antes.
            </p>
          </section>
        )}

        <div className="flex gap-2.5">
          {/* TODO(BOOK-05): gerar o evento para a agenda do celular. */}
          <Button variant="secundario" className="flex-1 px-3">
            Pôr na agenda
          </Button>
          <Link
            to="/a/exemplo"
            className="inline-flex h-13 flex-1 pressable items-center justify-center rounded-[14px] border border-line bg-surface px-3 text-base font-semibold tracking-[-0.16px] text-ink"
          >
            Ver agendamento
          </Link>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-2.5 px-5 pt-12 pb-8.5 leading-[normal]">
        <p className="flex items-center gap-1.5 text-[13px] text-ink-2">
          Você também atende? Crie grátis no
          <Link to="/criar-conta">
            <Logo as="span" className="text-[13px] leading-[normal] tracking-[-0.03em]" />
          </Link>
        </p>
        <LinksLegais />
      </footer>

      <Toast aberto={copiado} onFechar={fecharAviso}>
        Chave Pix copiada
      </Toast>
    </div>
  );
}
