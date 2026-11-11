import { useEffect } from "react";
import checkIcon from "@/presentation/assets/icons/check-14.svg";

/**
 * Aviso rápido (Figma · C4): pílula escura com o check verde, perto do fim da tela.
 * Some sozinho depois de `duracao` ms. aberto/onFechar: controlado por quem usa.
 */
export function Toast({ aberto, onFechar, children, duracao = 2500 }) {
  useEffect(() => {
    if (!aberto) return;
    const t = setTimeout(onFechar, duracao);
    return () => clearTimeout(t);
  }, [aberto, onFechar, duracao]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-30 z-50 flex justify-center px-5"
    >
      {aberto && (
        <p className="flex items-center gap-2.5 rounded-full bg-ink py-3 pr-4.5 pl-3.5 text-sm leading-[normal] font-medium text-surface">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success">
            <img src={checkIcon} alt="" width={14} height={14} />
          </span>
          {children}
        </p>
      )}
    </div>
  );
}
