import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { StepProgress } from "@/presentation/components/ui/StepProgress";
import { cn } from "@/presentation/utils/cn";
import voltar18 from "@/presentation/assets/icons/voltar-18.svg";
import voltar20 from "@/presentation/assets/icons/voltar-20.svg";

export const TOTAL_PASSOS = 4;

/**
 * Moldura dos passos do cadastro (ONB-01..05): topo, progresso, título,
 * conteúdo e botão fixo embaixo. onBack mostra o botão de voltar (do passo 2 em diante).
 * backIcon: "20" ou "18" — o Figma usa tamanhos diferentes de seta por passo.
 */
export function CadastroLayout({
  passo,
  title,
  description,
  children,
  submitLabel = "Continuar",
  canSubmit = true,
  onSubmit,
  onBack,
  backIcon = "20",
  contentClassName,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3"
    >
      <header className="flex h-13 items-center justify-between px-5">
        <div className="flex min-w-25 items-center">
          {onBack && (
            <IconButton
              icon={backIcon === "18" ? voltar18 : voltar20}
              iconSize={Number(backIcon)}
              label="Voltar"
              onClick={onBack}
            />
          )}
        </div>
        <p className="text-[13px] font-medium text-ink-2">
          Passo {passo} de {TOTAL_PASSOS}
        </p>
      </header>
      <StepProgress current={passo} total={TOTAL_PASSOS} className="px-5 py-1" />

      <main className={cn("flex flex-1 flex-col gap-4.5 px-5 py-4", contentClassName)}>
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] leading-[1.12] font-semibold tracking-[-0.84px] text-ink">
            {title}
          </h1>
          {description && <p className="text-[15px] leading-[1.45] text-ink-2">{description}</p>}
        </div>
        {children}
      </main>

      <footer className="sticky bottom-0 bg-paper px-5 pt-3 pb-8.5">
        <Button type="submit" className="w-full" disabled={!canSubmit}>
          {submitLabel}
        </Button>
      </footer>
    </form>
  );
}
