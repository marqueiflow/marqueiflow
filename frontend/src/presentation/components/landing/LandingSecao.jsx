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
      className={cn(
        "mx-auto flex w-full max-w-[1160px] flex-col gap-4 px-5 py-8 leading-[normal] lg:gap-8 lg:py-18",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:gap-2.5">
        <h2
          id={id ? `${id}-titulo` : undefined}
          className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink lg:text-[38px] lg:leading-[1.1] lg:tracking-[-0.025em]"
        >
          {titulo}
        </h2>
        {subtitulo && (
          <p className="text-[15px] leading-[1.45] text-ink-2 lg:text-[17px]">{subtitulo}</p>
        )}
      </div>
      {children}
    </section>
  );
}
