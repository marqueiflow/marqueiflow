import { cn } from "@/presentation/utils/cn";
import ligadoMd from "@/presentation/assets/icons/interruptor-ligado.svg";
import desligadoMd from "@/presentation/assets/icons/interruptor-desligado.svg";
import ligadoSm from "@/presentation/assets/icons/interruptor-p-ligado.svg";
import desligadoSm from "@/presentation/assets/icons/interruptor-p-desligado.svg";

const sizes = {
  md: { w: 48, h: 28, on: ligadoMd, off: desligadoMd, box: "interruptor-md" },
  sm: { w: 44, h: 26, on: ligadoSm, off: desligadoSm, box: "interruptor-sm" },
};

/** Interruptor liga/desliga. md = 48 × 28, sm = 44 × 26. Área de toque de 44 px de altura. */
export function Switch({ checked, onChange, label, size = "md", className }) {
  const s = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn("interruptor", s.box, className)}
    >
      <img src={checked ? s.on : s.off} alt="" width={s.w} height={s.h} />
    </button>
  );
}
