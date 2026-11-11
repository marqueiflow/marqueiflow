import { Link } from "react-router";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

const linha =
  "flex pressable items-center gap-2 py-[13px] pr-3 pl-4 text-left active:scale-100 active:bg-paper";

/**
 * Grupo de ajustes com título pequeno em cima.
 * itens: { id, label, valor?, to?, onClick?, perigo? }.
 * to: vira link; sem to, vira botão. perigo: texto vermelho e sem seta (ex.: Sair).
 */
export function SecaoAjustes({ titulo, itens }) {
  return (
    <section className="flex flex-col gap-2 leading-[normal]">
      <h2 className="text-[13px] font-medium text-ink-2">{titulo}</h2>
      <ListGroup inset>
        {itens.map((item) => {
          const conteudo = (
            <>
              <span
                className={cn(
                  "min-w-0 flex-1 text-[15px] tracking-[-0.15px]",
                  item.perigo ? "font-semibold text-danger" : "font-medium text-ink",
                )}
              >
                {item.label}
              </span>
              {item.valor && <span className="truncate text-sm text-ink-2">{item.valor}</span>}
              {!item.perigo && (
                <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
              )}
            </>
          );

          return item.to ? (
            <Link key={item.id} to={item.to} className={linha}>
              {conteudo}
            </Link>
          ) : (
            <button key={item.id} type="button" onClick={item.onClick} className={linha}>
              {conteudo}
            </button>
          );
        })}
      </ListGroup>
    </section>
  );
}
