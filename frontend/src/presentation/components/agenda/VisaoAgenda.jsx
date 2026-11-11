import { Link } from "react-router";
import { cn } from "@/presentation/utils/cn";

const VISOES = [
  { id: "dia", label: "Dia", to: "/painel" },
  { id: "semana", label: "Semana", to: "/painel/semana" },
];

/** Alternância Dia / Semana da agenda (controle segmentado). */
export function VisaoAgenda({ ativa }) {
  return (
    <nav aria-label="Visão da agenda" className="flex gap-1 rounded-xl bg-line p-1">
      {VISOES.map((visao) => {
        const isAtiva = visao.id === ativa;
        return (
          <Link
            key={visao.id}
            to={visao.to}
            aria-current={isAtiva ? "page" : undefined}
            className={cn(
              "relative flex h-9 flex-1 pressable items-center justify-center rounded-[9px] text-sm",
              "before:absolute before:inset-x-0 before:-inset-y-1",
              isAtiva ? "bg-surface font-semibold text-ink" : "font-medium text-ink-2",
            )}
          >
            {visao.label}
          </Link>
        );
      })}
    </nav>
  );
}
