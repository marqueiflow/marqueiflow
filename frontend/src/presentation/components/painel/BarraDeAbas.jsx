import { Link } from "react-router";
import { cn } from "@/presentation/utils/cn";
import agenda from "@/presentation/assets/icons/aba-agenda.svg";
import agendaAtiva from "@/presentation/assets/icons/aba-agenda-ativa.svg";
import clientes from "@/presentation/assets/icons/aba-clientes.svg";
import clientesAtiva from "@/presentation/assets/icons/aba-clientes-ativa.svg";
import resumo from "@/presentation/assets/icons/aba-resumo.svg";
import resumoAtiva from "@/presentation/assets/icons/aba-resumo-ativa.svg";
import ajustes from "@/presentation/assets/icons/aba-ajustes.svg";
import ajustesAtiva from "@/presentation/assets/icons/aba-ajustes-ativa.svg";

// Ícones do Figma (Barra de abas) no estado inativo e ativo.
const ABAS = [
  { id: "agenda", label: "Agenda", to: "/painel", icone: agenda, iconeAtivo: agendaAtiva },
  {
    id: "clientes",
    label: "Clientes",
    to: "/painel/clientes",
    icone: clientes,
    iconeAtivo: clientesAtiva,
  },
  { id: "resumo", label: "Resumo", to: "/painel/resumo", icone: resumo, iconeAtivo: resumoAtiva },
  {
    id: "ajustes",
    label: "Ajustes",
    to: "/painel/ajustes",
    icone: ajustes,
    iconeAtivo: ajustesAtiva,
  },
];

/** Barra de abas do painel do profissional, fixa no rodapé. */
export function BarraDeAbas({ ativa }) {
  return (
    <nav
      aria-label="Painel"
      className="sticky bottom-0 flex h-20 w-full shrink-0 items-start border-t border-line bg-surface px-3 pt-2.5 pb-7.5"
    >
      {ABAS.map((aba) => {
        const isAtiva = aba.id === ativa;
        return (
          <Link
            key={aba.id}
            to={aba.to}
            aria-current={isAtiva ? "page" : undefined}
            className="relative flex flex-1 pressable flex-col items-center gap-1 before:absolute before:inset-x-0 before:-top-2.5 before:-bottom-2"
          >
            <img src={isAtiva ? aba.iconeAtivo : aba.icone} alt="" width={22} height={22} />
            <span
              className={cn(
                "text-[11px]",
                isAtiva ? "font-semibold text-ink" : "font-medium text-ink-2",
              )}
            >
              {aba.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
