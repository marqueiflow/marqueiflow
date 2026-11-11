import { useId } from "react";
import { cn } from "@/presentation/utils/cn";

const hintTones = {
  neutro: "campo-dica-neutra",
  sucesso: "campo-dica-sucesso",
  erro: "campo-dica-erro",
};

/**
 * Campo de texto (Figma · Componentes base). Em foco a borda fica preta.
 * prefix: texto fixo antes do valor (ex.: "marqueiflow.com.br/" ou "R$").
 * suffix: ícone no fim da caixa. hintTone: "neutro" | "sucesso" | "erro" (erro também pinta a borda).
 */
export function TextField({
  label,
  hint,
  hintTone = "neutro",
  prefix,
  prefixClassName,
  suffix,
  className,
  inputClassName,
  id,
  ...inputProps
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-dica` : undefined;

  return (
    <div className={cn("campo", className)}>
      {label && (
        <label htmlFor={inputId} className="campo-rotulo">
          {label}
        </label>
      )}
      <div
        className={cn(
          "campo-caixa",
          hintTone === "erro" && "campo-caixa-erro",
          suffix && "campo-caixa-com-sufixo",
        )}
      >
        {prefix && <span className={cn("campo-prefixo", prefixClassName)}>{prefix}</span>}
        <input
          id={inputId}
          aria-describedby={hintId}
          className={cn("campo-entrada", inputClassName)}
          {...inputProps}
        />
        {suffix && <span className="campo-sufixo">{suffix}</span>}
      </div>
      {hint && (
        <p id={hintId} className={cn("campo-dica", hintTones[hintTone])}>
          {hint}
        </p>
      )}
    </div>
  );
}
