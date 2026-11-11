import { Link, Outlet, ScrollRestoration, useMatches } from "react-router";
import { Logo } from "@/presentation/components/ui/Logo";

/**
 * Raiz das rotas: cada navegação abre a tela no topo (e "voltar" devolve a rolagem anterior).
 * Em cima de toda tela vai a faixa com a logo no canto direito. Na rota, o handle controla:
 * - semLogo: a tela já mostra a logo grande (Entrar, início, link não encontrado), então sem faixa;
 * - logoInicio: tocar na logo volta para a página inicial (telas de cadastro).
 */
export function RootLayout() {
  const matches = useMatches();
  const semLogo = matches.some((m) => m.handle?.semLogo);
  const logoInicio = matches.some((m) => m.handle?.logoInicio);
  const logo = <Logo as="span" className="text-[15px] leading-none tracking-[-0.04em]" />;

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollRestoration />
      {!semLogo && (
        <div className="mx-auto flex w-full max-w-[430px] justify-end bg-paper px-5 pt-3">
          {logoInicio ? (
            <Link to="/" aria-label="MarqueiFlow, página inicial" className="area-toque pressable">
              {logo}
            </Link>
          ) : (
            logo
          )}
        </div>
      )}
      <Outlet />
    </div>
  );
}
