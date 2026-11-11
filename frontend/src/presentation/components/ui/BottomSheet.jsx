import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { cn } from "@/presentation/utils/cn";
import fecharIcon from "@/presentation/assets/icons/fechar-16.svg";

const FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Folha que sobe de baixo (Figma · Modais): fundo escurecido, alça, título, texto e botão de fechar.
 * Fecha ao tocar no fundo, no X ou com Esc. className: ajustes da folha (ex.: outro espaçamento).
 * semFechar: esconde o X (ex.: C3, em que a pessoa precisa escolher uma das opções).
 *
 * Acessibilidade: abre fora da tela (portal), deixa a tela de trás inerte, leva o foco para dentro,
 * prende o Tab na folha e devolve o foco para quem abriu quando fecha.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  description,
  className,
  semFechar = false,
  children,
}) {
  const titleId = useId();
  const folhaRef = useRef(null);
  // Guarda o onClose mais recente sem reabrir a folha quando ele muda.
  const fecharRef = useRef(onClose);
  useEffect(() => {
    fecharRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const folha = folhaRef.current;
    const anterior = document.activeElement;
    const raiz = document.getElementById("root");
    const overflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    raiz?.setAttribute("inert", "");
    (folha.querySelector(FOCAVEIS) ?? folha).focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        fecharRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const itens = [...folha.querySelectorAll(FOCAVEIS)];
      if (itens.length === 0) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      raiz?.removeAttribute("inert");
      anterior?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="folha-fundo">
      <div className="folha-escurecimento" onClick={onClose} aria-hidden="true" />
      <div
        ref={folhaRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn("folha", className)}
      >
        <div className="folha-alca" aria-hidden="true">
          <div className="folha-alca-barra" />
        </div>
        <div className="folha-cabecalho">
          <div className="folha-textos">
            <h2 id={titleId} className="folha-titulo">
              {title}
            </h2>
            {description && <p className="folha-descricao">{description}</p>}
          </div>
          {!semFechar && (
            <IconButton
              icon={fecharIcon}
              iconSize={16}
              label="Fechar"
              onClick={onClose}
              className="folha-fechar"
            />
          )}
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
