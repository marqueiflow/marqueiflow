import { cn } from "@/presentation/utils/cn";

/** Botão tracejado de "adicionar" (ex.: Adicionar serviço). */
export function DashedButton({ icon, children, className, type = "button", ...props }) {
  return (
    <button type={type} className={cn("botao-tracejado", className)} {...props}>
      {icon && <img src={icon} alt="" width={18} height={18} />}
      {children}
    </button>
  );
}
