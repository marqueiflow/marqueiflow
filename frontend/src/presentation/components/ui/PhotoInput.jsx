import { useEffect, useId, useMemo } from "react";
import { cn } from "@/presentation/utils/cn";
import cameraIcon from "@/presentation/assets/icons/camera.svg";
/** Escolher foto: círculo tracejado com câmera; mostra a prévia depois de escolher. */
export function PhotoInput({ title, description, value, onChange, className }) {
  const id = useId();
  const preview = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);
  return (
    <div className={cn("foto", className)}>
      <label htmlFor={id} className={cn("foto-botao", !preview && "foto-botao-vazio")}>
        {preview ? (
          <img src={preview} alt="" className="foto-imagem" />
        ) : (
          <img src={cameraIcon} alt="" width={24} height={24} />
        )}
        <span className="sr-only">{preview ? "Trocar foto" : "Adicionar foto"}</span>
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <div className="foto-texto">
        <p className="foto-titulo">{title}</p>
        {description && <p className="foto-descricao">{description}</p>}
      </div>
    </div>
  );
}
