import { BarraDeAbas } from "@/presentation/components/painel/BarraDeAbas";
import { cn } from "@/presentation/utils/cn";

/**
 * Moldura das telas do painel: conteúdo rolável e a barra de abas embaixo.
 * className: ajustes do conteúdo (ex.: outro espaçamento entre blocos).
 */
export function PainelLayout({ aba, className, children }) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className={cn("flex flex-1 flex-col gap-5 px-5 pt-3 pb-4", className)}>{children}</main>
      <BarraDeAbas ativa={aba} />
    </div>
  );
}
