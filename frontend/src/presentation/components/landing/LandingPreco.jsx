import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";

/** Cartão escuro "Grátis." com o botão laranja. No computador, texto e botão ficam lado a lado. */
export function LandingPreco() {
  return (
    <section aria-labelledby="preco-titulo" className="landing-preco">
      <div className="landing-preco-cartao">
        <div className="landing-preco-texto">
          <h2 id="preco-titulo" className="landing-preco-titulo">
            Grátis.
          </h2>
          <p className="landing-preco-descricao">
            Sem mensalidade. O sinal do Pix cai direto na sua conta, a gente não toca no dinheiro.
          </p>
        </div>
        <Button as={Link} to="/criar-conta" variant="destaque" className="landing-preco-botao">
          Criar minha agenda grátis
        </Button>
      </div>
    </section>
  );
}
