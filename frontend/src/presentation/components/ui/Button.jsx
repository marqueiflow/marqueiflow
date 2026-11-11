import { cn } from "@/presentation/utils/cn";
const variants = {
  primario: "bg-ink text-surface",
  secundario: "border border-line bg-surface text-ink",
  texto: "text-ink",
  perigo: "bg-danger text-surface",
  destaque: "bg-accent text-ink",
};
/**
 * Botão base. Primário: uma ação por tela. Perigo: ação que desfaz algo (ex.: cancelar).
 * Destaque: laranja, só sobre fundo escuro (ex.: cartão "Grátis." da landing).
 * as: troca o elemento (ex.: as={Link} to="/entrar" para um link com cara de botão).
 */
export function Button({ variant = "primario", className, as: Tag = "button", type, ...props }) {
  return (
    <Tag
      type={Tag === "button" ? (type ?? "button") : type}
      className={cn(
        "inline-flex h-13 pressable items-center justify-center gap-2 rounded-[14px] px-6",
        "text-base font-semibold tracking-[-0.16px]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
