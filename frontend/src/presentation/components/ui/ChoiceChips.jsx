import { cn } from "@/presentation/utils/cn";

/**
 * Opções de escolha única em pílulas (ex.: duração, % do sinal).
 * options: [{ value, label }]. Selecionada = fundo preto.
 */
export function ChoiceChips({ label, options, value, onChange, className }) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("opcoes", className)}>
      {options.map((opcao) => {
        const selecionada = opcao.value === value;
        return (
          <button
            key={String(opcao.value)}
            type="button"
            role="radio"
            aria-checked={selecionada}
            onClick={() => onChange(opcao.value)}
            className={cn("opcao", selecionada ? "opcao-ativa" : "opcao-inativa")}
          >
            {opcao.label}
          </button>
        );
      })}
    </div>
  );
}
