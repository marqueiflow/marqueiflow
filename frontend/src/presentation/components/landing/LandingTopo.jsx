import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { Logo } from "@/presentation/components/ui/Logo";

/** Topo da landing (Figma · Landing page): logo, Entrar e, no computador, o botão de criar. */
export function LandingTopo() {
  return (
    <header className="landing-topo">
      <Link to="/" aria-label="MarqueiFlow, página inicial">
        <Logo as="span" className="landing-topo-logo" />
      </Link>
      <nav className="landing-topo-acoes">
        <Button as={Link} to="/entrar" variant="texto">
          Entrar
        </Button>
        <Button as={Link} to="/criar-conta" className="landing-topo-criar">
          Criar minha agenda
        </Button>
      </nav>
    </header>
  );
}
