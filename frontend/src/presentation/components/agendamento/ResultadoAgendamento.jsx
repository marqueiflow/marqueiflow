import { cn } from "@/presentation/utils/cn";

/**
 * Tela de resultado depois de remarcar ou cancelar (Figma 09 e 10).
 * selo: { icone, className } — círculo de 64 px com o ícone de 28 px.
 * linhas: [{ label, valor, riscado? }] — riscado deixa a linha cinza e com traço.
 * aviso: bloco opcional embaixo do resumo. acoes: botões do rodapé.
 */
export function ResultadoAgendamento({ selo, titulo, texto, linhas, aviso, acoes }) {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className="flex flex-1 flex-col gap-4.5 px-5 pt-10 pb-4 leading-[normal]">
        <header className="flex flex-col items-center gap-2.5 pb-2 text-center">
          <span
            className={cn("flex size-16 items-center justify-center rounded-full", selo.className)}
          >
            <img src={selo.icone} alt="" width={28} height={28} />
          </span>
          <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.9px] text-ink">
            {titulo}
          </h1>
          <p className="text-[15px] leading-[1.45] text-ink-2">{texto}</p>
        </header>

        <section className="flex flex-col gap-2.5 rounded-2xl border border-line bg-surface px-4.5 py-4 text-[15px]">
          {linhas.map((l) => (
            <p key={l.label} className="flex justify-between gap-3">
              <span className="text-ink-2">{l.label}</span>
              <span
                className={cn(
                  "font-medium tracking-[-0.15px]",
                  l.riscado ? "text-ink-2 line-through" : "text-ink",
                )}
              >
                {l.valor}
              </span>
            </p>
          ))}
        </section>

        {aviso}
      </main>

      <footer className="flex flex-col gap-2.5 px-5 pt-3 pb-8.5">{acoes}</footer>
    </div>
  );
}
