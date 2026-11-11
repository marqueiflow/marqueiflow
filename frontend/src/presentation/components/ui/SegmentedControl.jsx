import { cn } from "@/presentation/utils/cn";

/**
 * Controle segmentado: opções lado a lado num trilho cinza; a escolhida fica em branco.
 * options: [{ value, label, count? }]. count aparece menor, ao lado do rótulo.
 */
export function SegmentedControl({ label, options, value, onChange, className }) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("segmentado", className)}>
      {options.map((opcao) => {
        const selecionada = opcao.value === value;
        return (
          <button
            key={opcao.value}
            type="button"
            role="radio"
            aria-checked={selecionada}
            onClick={() => onChange(opcao.value)}
            className={cn(
              "segmentado-opcao",
              selecionada ? "segmentado-opcao-ativa" : "segmentado-opcao-inativa",
            )}
          >
            <span
              className={cn(
                "segmentado-rotulo",
                selecionada ? "segmentado-rotulo-ativo" : "segmentado-rotulo-inativo",
              )}
            >
              {opcao.label}
            </span>
            {opcao.count != null && <span className="segmentado-contagem">{opcao.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
