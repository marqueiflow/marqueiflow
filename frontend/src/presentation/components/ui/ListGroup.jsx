import { Children, Fragment } from "react";
import { cn } from "@/presentation/utils/cn";

/**
 * Lista agrupada: um cartão com borda fina e divisórias entre os itens.
 * inset: a divisória começa depois do recuo esquerdo (16 px), como em ajustes.
 * dividerClassName: recuo diferente para a divisória (ex.: "pl-[50px]" para alinhar ao texto).
 */
export function ListGroup({ children, inset = false, dividerClassName, className }) {
  const itens = Children.toArray(children).filter(Boolean);

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface",
        className,
      )}
    >
      {itens.map((item, i) => (
        <Fragment key={item.key ?? i}>
          {i > 0 && (
            <div className={cn("flex", inset && "pl-4", dividerClassName)} aria-hidden="true">
              <div className="h-px flex-1 bg-line" />
            </div>
          )}
          {item}
        </Fragment>
      ))}
    </div>
  );
}
