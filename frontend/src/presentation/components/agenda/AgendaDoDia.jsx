import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import maisIcon from "@/presentation/assets/icons/mais-16.svg";

/**
 * Lista de horários do dia: atendimentos marcados e horários livres.
 * itens: { hora, cliente, servico, status } ou { hora, livre: true }.
 */
export function AgendaDoDia({ itens, onAbrir, onMarcar }) {
  return (
    <ListGroup className="leading-[normal]">
      {itens.map((item) =>
        item.livre ? (
          <div key={item.hora} className="flex items-center gap-3.5 py-3.5 pr-3.5 pl-4">
            <p className="w-[46px] shrink-0 text-[15px] font-semibold tracking-[-0.15px] text-ink-2 tabular-nums">
              {item.hora}
            </p>
            <p className="min-w-0 flex-1 text-[15px] tracking-[-0.15px] text-ink-2">
              Horário livre
            </p>
            <button
              type="button"
              onClick={() => onMarcar?.(item)}
              className="-my-3.5 flex h-11 shrink-0 pressable items-center gap-1 text-sm font-semibold text-accent-strong"
            >
              <img src={maisIcon} alt="" width={16} height={16} />
              Marcar
            </button>
          </div>
        ) : (
          <button
            key={item.hora}
            type="button"
            onClick={() => onAbrir?.(item)}
            className="flex pressable items-center gap-3.5 py-3.5 pr-3.5 pl-4 text-left active:scale-100 active:bg-paper"
          >
            <p className="w-[46px] shrink-0 text-[15px] font-semibold tracking-[-0.15px] text-ink tabular-nums">
              {item.hora}
            </p>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <p className="truncate text-[15px] font-semibold tracking-[-0.15px] text-ink">
                {item.cliente}
              </p>
              <p className="truncate text-[13px] text-ink-2">{item.servico}</p>
            </div>
            <StatusBadge status={item.status} />
          </button>
        ),
      )}
    </ListGroup>
  );
}
