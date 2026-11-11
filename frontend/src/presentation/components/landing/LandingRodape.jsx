import { LinksLegais } from "@/presentation/components/legal/LinksLegais";
import { Logo } from "@/presentation/components/ui/Logo";

/** Rodapé da landing. No celular, tudo centralizado; no computador, uma linha com borda em cima. */
export function LandingRodape() {
  return (
    <footer className="landing-rodape">
      <div className="landing-rodape-conteudo">
        <div className="landing-rodape-marca">
          <Logo as="span" className="landing-rodape-logo" />
          <p className="landing-rodape-texto">Agenda online para profissionais autônomos.</p>
        </div>
        <LinksLegais className="landing-rodape-links" />
      </div>
    </footer>
  );
}
