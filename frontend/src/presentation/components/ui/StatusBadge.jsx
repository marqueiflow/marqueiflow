import { cn } from "@/presentation/utils/cn";
import dotConfirmado from "@/presentation/assets/icons/status-confirmado.svg";
import dotAguardando from "@/presentation/assets/icons/status-aguardando.svg";
import dotFaltou from "@/presentation/assets/icons/status-faltou.svg";
const config = {
  confirmado: {
    label: "Confirmado",
    dot: dotConfirmado,
    className: "selo-confirmado",
  },
  "aguardando-sinal": {
    label: "Aguardando sinal",
    dot: dotAguardando,
    className: "selo-aguardando",
  },
  faltou: { label: "Faltou", dot: dotFaltou, className: "selo-faltou" },
};
export function StatusBadge({ status, className }) {
  const { label, dot, className: tone } = config[status];
  return (
    <span className={cn("selo", tone, className)}>
      <img src={dot} alt="" width={6} height={6} />
      {label}
    </span>
  );
}
