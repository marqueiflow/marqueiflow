import { cn } from "@/presentation/utils/cn";

const sizes = {
  // Cartão de serviço: título 17, valor à direita em 17.
  lg: {
    row: "linha-conteudo-lg",
    title: "linha-titulo-lg",
    gap: "linha-texto-lg",
    desc: "linha-descricao-lg",
  },
  // Linha de ajuste: título 15, com interruptor ou opções.
  md: {
    row: "linha-conteudo-md",
    title: "linha-titulo-md",
    gap: "linha-texto-md",
    desc: "linha-descricao-md",
  },
};

/**
 * Linha de lista: título, descrição embaixo e algo à direita (preço, interruptor...).
 * trailing: string vira texto em destaque; elemento é renderizado como veio.
 * children: conteúdo extra embaixo da linha (ex.: opções que aparecem quando liga).
 */
export function ListRow({
  title,
  description,
  trailing,
  size = "lg",
  className,
  rowClassName,
  children,
}) {
  const s = sizes[size];

  return (
    <div className={cn("linha", className)}>
      <div className={cn("linha-conteudo", s.row, rowClassName)}>
        <div className={cn("linha-texto", s.gap)}>
          <p className={cn("linha-titulo", s.title)}>{title}</p>
          {description && <p className={cn("linha-descricao", s.desc)}>{description}</p>}
        </div>
        {typeof trailing === "string" ? (
          <p className={cn("linha-valor", s.title)}>{trailing}</p>
        ) : (
          trailing
        )}
      </div>
      {children}
    </div>
  );
}
