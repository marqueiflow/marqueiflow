import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { Logo } from "@/presentation/components/ui/Logo";

/** Topo da landing (Figma · Landing page): logo, Entrar e, no computador, o botão de criar. */
export function LandingTopo() {
  return (
    <header className="mx-auto flex w-full max-w-[1160px] items-center justify-between pt-3 pr-3 pb-1 pl-5 lg:px-5 lg:py-6">
      <Link to="/" aria-label="MarqueiFlow, página inicial">
        <Logo as="span" className="text-[22px] lg:text-[26px]" />
      </Link>
      <nav className="flex items-center gap-2">
        <Button as={Link} to="/entrar" variant="texto">
          Entrar
        </Button>
        <Button as={Link} to="/criar-conta" className="hidden lg:inline-flex">
          Criar minha agenda
        </Button>
      </nav>
    </header>
  );
}
