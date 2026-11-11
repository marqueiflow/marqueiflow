import { Link } from "react-router";
import { cn } from "@/presentation/utils/cn";

/** Links "Política de privacidade · Termos de uso" dos rodapés. className: outro tamanho/espaço. */
export function LinksLegais({ className }) {
  return (
    <p className={cn("flex items-center gap-2 text-xs leading-[normal] text-ink-2", className)}>
      <Link to="/privacidade" className="area-toque font-medium underline">
        Política de privacidade
      </Link>
      ·
      <Link to="/termos" className="area-toque font-medium underline">
        Termos de uso
      </Link>
    </p>
  );
}
