// LGL-03 — Moldura das páginas legais (Figma 15 · Privacidade e 16 · Termos).
import { useNavigate } from "react-router";
import { IconButton } from "@/presentation/components/ui/IconButton";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";

/**
 * secoes: [{ titulo, texto }]. texto pode ser string ou elemento (ex.: link de e-mail).
 * Voltar retorna para a tela anterior (Entrar, Ajustes ou a página do profissional);
 * se a página foi aberta direto, vai para o início.
 */
export function LegalLayout({ titulo, atualizadoEm, intro, secoes }) {
  const navigate = useNavigate();
  const voltar = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton icon={voltarIcon} iconSize={18} label="Voltar" onClick={voltar} />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">{titulo}</h1>
      </header>

      <main className="flex flex-col gap-6 px-5 pt-3 pb-10">
        <div className="flex flex-col gap-2 text-ink-2">
          <p className="text-[13px] leading-[1.4] font-medium">Atualizado em {atualizadoEm}</p>
          <p className="text-[15px] leading-normal">{intro}</p>
        </div>

        <hr className="border-line" />

        {secoes.map((s) => (
          <section key={s.titulo} className="flex flex-col gap-1.5">
            <h2 className="text-[17px] leading-[1.4] font-semibold tracking-[-0.17px] text-ink">
              {s.titulo}
            </h2>
            <p className="text-[15px] leading-normal text-ink-2">{s.texto}</p>
          </section>
        ))}
      </main>
    </div>
  );
}
