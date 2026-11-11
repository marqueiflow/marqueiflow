import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";

/** Cartão escuro "Grátis." com o botão laranja. No computador, texto e botão ficam lado a lado. */
export function LandingPreco() {
  return (
    <section
      aria-labelledby="preco-titulo"
      className="mx-auto w-full max-w-[1160px] px-5 pt-4 pb-8 leading-[normal] lg:pt-6 lg:pb-18"
    >
      <div className="flex flex-col gap-3 rounded-2xl bg-ink px-5 pt-6 pb-5 lg:flex-row lg:items-center lg:gap-10 lg:rounded-3xl lg:px-12 lg:py-11">
        <div className="flex flex-col gap-3 lg:flex-1">
          <h2
            id="preco-titulo"
            className="text-[40px] leading-none font-semibold tracking-[-0.03em] text-surface lg:text-[64px] lg:tracking-[-0.035em]"
          >
            Grátis.
          </h2>
          <p className="text-[15px] leading-[1.45] text-ink-3 lg:text-lg">
            Sem mensalidade. O sinal do Pix cai direto na sua conta, a gente não toca no dinheiro.
          </p>
        </div>
        <Button
          as={Link}
          to="/criar-conta"
          variant="destaque"
          className="w-full lg:h-14 lg:w-auto lg:shrink-0 lg:px-7 lg:text-[17px]"
        >
          Criar minha agenda grátis
        </Button>
      </div>
    </section>
  );
}
