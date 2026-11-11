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
    <div role="status" aria-live="polite" className="aviso-area">
      {aberto && (
        <p className="aviso">
          <span className="aviso-icone">
            <img src={checkIcon} alt="" width={14} height={14} />
          </span>
          {children}
        </p>
      )}
    </div>
  );
}
