import { cn } from "@/presentation/utils/cn";

/**
 * Botão redondo de 40 px com ícone (ex.: voltar).
 * A área de toque é ampliada para 44 px sem mudar o desenho.
 */
export function IconButton({ icon, iconSize = 20, label, className, type = "button", ...props }) {
  return (
    <button type={type} aria-label={label} className={cn("botao-icone", className)} {...props}>
      <img src={icon} alt="" width={iconSize} height={iconSize} />
    </button>
  );
}
