import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

/**
 * Lista de clientes: iniciais, última visita, total gasto.
 * clientes: { id, iniciais, nome, ultimaVisita, total, sumido?, novo? }.
 * sumido: a linha da última visita fica em laranja.
 */
export function ListaClientes({ clientes, onAbrir }) {
  return (
    <ListGroup dividerClassName="pl-[66px]" className="leading-[normal]">
      {clientes.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onAbrir?.(c)}
          className="flex pressable items-center gap-3 py-3 pr-3 pl-3.5 text-left active:scale-100 active:bg-paper"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-line text-sm font-semibold tracking-[-0.28px] text-ink">
            {c.iniciais}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-[15px] font-semibold tracking-[-0.15px] text-ink">
              {c.nome}
            </span>
            <span
              className={cn(
                "truncate text-[13px]",
                c.sumido ? "font-medium text-accent-strong" : "text-ink-2",
              )}
            >
              {c.ultimaVisita}
            </span>
          </span>
          <span className="shrink-0 text-[15px] font-semibold tracking-[-0.15px] text-ink tabular-nums">
            {c.total}
          </span>
          <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
        </button>
      ))}
    </ListGroup>
  );
}
