import { LinksLegais } from "@/presentation/components/legal/LinksLegais";
import { Logo } from "@/presentation/components/ui/Logo";

/** Rodapé da landing. No celular, tudo centralizado; no computador, uma linha com borda em cima. */
export function LandingRodape() {
  return (
    <footer className="leading-[normal] lg:border-t lg:border-line">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col items-center gap-2.5 px-5 pt-6 pb-10 lg:flex-row lg:justify-between lg:pt-8">
        <div className="flex flex-col items-center gap-2.5 lg:flex-row lg:gap-4">
          <Logo as="span" className="text-lg lg:text-xl" />
          <p className="text-[13px] text-ink-2 lg:text-sm">
            Agenda online para profissionais autônomos.
          </p>
        </div>
        <LinksLegais className="lg:gap-2.5 lg:text-[13px]" />
      </div>
    </footer>
  );
}
