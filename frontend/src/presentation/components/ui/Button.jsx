import { cn } from "@/presentation/utils/cn";
const variants = {
  primario: "botao-primario",
  secundario: "botao-secundario",
  texto: "botao-texto",
  perigo: "botao-perigo",
  destaque: "botao-destaque",
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
      className={cn("botao", variants[variant], className)}
      {...props}
    />
  );
}
