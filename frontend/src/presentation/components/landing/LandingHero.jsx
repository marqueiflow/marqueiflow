import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import { TimeSlot } from "@/presentation/components/ui/TimeSlot";

// Exemplo ilustrativo da agenda (Figma · Landing page).
const HORARIOS = [
  { hora: "16:30", estado: "livre" },
  { hora: "17:00", estado: "selecionado" },
  { hora: "17:30", estado: "indisponivel" },
  { hora: "18:00", estado: "livre" },
];

/** Chamada principal: título, texto, botão de criar e a prévia da agenda. */
export function LandingHero() {
  return (
    <section className="mx-auto flex w-full max-w-[1160px] flex-col gap-4 px-5 pt-7 pb-9 leading-[normal] lg:flex-row lg:items-center lg:gap-16 lg:pt-16 lg:pb-24">
      <div className="flex flex-col gap-4 lg:flex-1 lg:gap-5">
        <p className="self-start rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong lg:text-sm">
          Agenda online para autônomos
        </p>
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-ink lg:text-[60px] lg:leading-[1.02] lg:tracking-[-0.035em]">
          Sua agenda cheia, sem ficar trocando mensagem.
        </h1>
        <p className="text-base leading-[1.45] text-ink-2 lg:text-[19px]">
          Um link para seus clientes marcarem sozinhos. Você só aparece para atender.
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Button as={Link} to="/criar-conta" className="w-full lg:w-auto">
            Criar minha agenda grátis
          </Button>
          <p className="text-center text-[13px] text-ink-2 lg:text-left lg:text-sm">
            Grátis, sem mensalidade e sem cartão.
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="flex flex-col gap-3 lg:w-[456px] lg:shrink-0">
        <div className="hidden flex-col gap-1 rounded-2xl bg-ink px-5 pt-4.5 pb-5 lg:flex">
          <p className="text-[13px] font-medium text-ink-3">Próximo · em 25 min</p>
          <p className="text-2xl font-semibold tracking-[-0.02em] text-surface">
            16:30<span className="ml-2.5">Lucas Andrade</span>
          </p>
          <p className="text-sm text-ink-3">Corte + barba · sinal pago</p>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 lg:px-5 lg:py-4.5">
          <p className="text-[13px] text-ink-2">Hoje · 6 atendimentos</p>
          <div className="grid grid-cols-4 gap-2">
            {HORARIOS.map((h) => (
              <TimeSlot key={h.hora} time={h.hora} state={h.estado} className="w-full" />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-semibold text-ink">Lucas marcou 17:00</p>
            <StatusBadge status="confirmado" />
          </div>
        </div>
      </div>
    </section>
  );
}
