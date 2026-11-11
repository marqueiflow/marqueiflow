// CLI-02 — Modal C5 · Trocar serviço (só a tela; serviços de exemplo do Figma)
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";

/**
 * O cliente troca o serviço mantendo o mesmo horário.
 * servicos: { id, nome, detalhe, preco, naoCabe? } — naoCabe: aparece apagado e não dá para escolher.
 * atual: id do serviço marcado hoje. onTrocar(servico): confirmou outro serviço.
 * Para a escolha voltar ao serviço atual a cada abertura, mude a key ao abrir.
 */
export function TrocarServicoSheet({ open, onClose, servicos, atual, onTrocar }) {
  const [escolhido, setEscolhido] = useState(atual);
  const servico = servicos.find((s) => s.id === escolhido);
  const mantem = escolhido === atual;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Trocar serviço"
      description="Seu horário continua seg, 17:00 — se o novo serviço couber."
    >
      <ListGroup dividerClassName="pl-[50px]" className="leading-[normal]">
        {servicos.map((s) => (
          <label
            key={s.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5",
              s.naoCabe ? "opacity-45" : "cursor-pointer active:bg-paper",
            )}
          >
            <input
              type="radio"
              name="servico"
              value={s.id}
              checked={escolhido === s.id}
              disabled={s.naoCabe}
              onChange={() => setEscolhido(s.id)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                "flex size-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                escolhido === s.id ? "border-ink bg-ink" : "border-line bg-surface",
              )}
            >
              {escolhido === s.id && <span className="size-2 rounded-full bg-surface" />}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[15px] font-semibold tracking-[-0.15px] text-ink">
                {s.nome}
              </span>
              <span className="truncate text-[13px] text-ink-2">
                {s.detalhe}
                {s.id === atual && " · atual"}
              </span>
            </span>
            <span className="shrink-0 text-[15px] font-semibold tracking-[-0.15px] text-ink tabular-nums">
              {s.preco}
            </span>
          </label>
        ))}
      </ListGroup>

      <p className="rounded-[14px] bg-paper px-3.5 py-3 text-[13px] leading-[1.45] text-ink-2">
        Serviços que não cabem no seu horário aparecem apagados. Para eles, use Remarcar.
      </p>

      <Button className="w-full" onClick={() => (mantem ? onClose() : onTrocar(servico))}>
        {mantem ? `Manter ${servico.nome}` : `Trocar para ${servico.nome}`}
      </Button>
    </BottomSheet>
  );
}
