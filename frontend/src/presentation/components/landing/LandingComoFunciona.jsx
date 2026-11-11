import { LandingSecao } from "./LandingSecao";

const PASSOS = [
  {
    titulo: "Crie seu link",
    texto:
      "Cadastre serviços, horários e a chave Pix. Sua página fica em marqueiflow.com.br/seunome.",
  },
  {
    titulo: "Mande para os clientes",
    texto: "Na bio do Instagram, no status do WhatsApp ou direto na conversa.",
  },
  {
    titulo: "Eles marcam sozinhos",
    texto: "Só aparecem horários livres. Você recebe o aviso e o lembrete sai sozinho.",
  },
];

/** Como funciona em 3 passos. No celular, um embaixo do outro; no computador, lado a lado. */
export function LandingComoFunciona() {
  return (
    <LandingSecao
      id="como-funciona"
      titulo="Como funciona"
      subtitulo="Três passos e sua agenda já recebe clientes."
    >
      <ol className="flex flex-col gap-4 lg:flex-row">
        {PASSOS.map((p, i) => (
          <li
            key={p.titulo}
            className="flex gap-3.5 rounded-2xl border border-line bg-surface p-4 lg:flex-1 lg:flex-col lg:p-6"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-surface lg:size-9 lg:text-base">
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-1 lg:gap-3.5">
              <h3 className="text-base font-semibold tracking-[-0.01em] text-ink lg:text-[19px] lg:tracking-[-0.015em]">
                {p.titulo}
              </h3>
              <p className="text-sm leading-[1.45] text-ink-2 lg:text-[15px] lg:leading-normal">
                {p.texto}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </LandingSecao>
  );
}
