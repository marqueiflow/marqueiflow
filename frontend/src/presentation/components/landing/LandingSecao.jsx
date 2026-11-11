import { cn } from "@/presentation/utils/cn";

/**
 * Seção da landing com título (e subtítulo opcional). Centraliza o conteúdo em 1120 px no
 * computador. className: ajustes de espaçamento da seção.
 */
export function LandingSecao({ id, titulo, subtitulo, className, children }) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-titulo` : undefined}
      className={cn("landing-secao", className)}
    >
      <div className="landing-secao-cabecalho">
        <h2 id={id ? `${id}-titulo` : undefined} className="landing-secao-titulo">
          {titulo}
        </h2>
        {subtitulo && <p className="landing-secao-subtitulo">{subtitulo}</p>}
      </div>
      {children}
    </section>
  );
}
