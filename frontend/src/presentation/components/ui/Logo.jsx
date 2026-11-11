import { cn } from "@/presentation/utils/cn";

/**
 * Wordmark "marqueiflow." (Figma · Identidade Visual). O "f" é mais apertado que o resto
 * e o ponto laranja é "quem já marcou". Não alterar proporções.
 * Tamanho padrão 26 px; para o selo pequeno, passe text-[13px] em className.
 */
export function Logo({ className, as: Tag = "p" }) {
  return (
    <Tag className={cn("logo", className)} aria-label="MarqueiFlow">
      marquei<span className="logo-f">f</span>low
      <span className="logo-ponto">.</span>
    </Tag>
  );
}
