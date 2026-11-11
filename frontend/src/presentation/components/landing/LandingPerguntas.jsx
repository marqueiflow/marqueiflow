import { ListGroup } from "@/presentation/components/ui/ListGroup";

const EMAIL = "contato@marqueiflow.com.br";

const PERGUNTAS = [
  {
    pergunta: "O cliente precisa baixar app ou criar conta?",
    resposta: "Não. Ele abre o seu link, escolhe o horário e informa nome e WhatsApp.",
  },
  {
    pergunta: "Como funciona o sinal?",
    resposta: "Você escolhe quanto cobrar. O cliente paga por Pix direto para você.",
  },
  {
    pergunta: "Posso pausar a agenda nas férias?",
    resposta: "Pode. Você bloqueia dias ou períodos e eles somem do seu link.",
  },
];

/** Perguntas frequentes. No computador, o título fica à esquerda e a lista à direita. */
export function LandingPerguntas() {
  return (
    <section
      id="perguntas"
      aria-labelledby="perguntas-titulo"
      className="mx-auto flex w-full max-w-[1160px] flex-col gap-4 px-5 py-8 leading-[normal] lg:flex-row lg:gap-16 lg:pt-6 lg:pb-24"
    >
      <div className="flex flex-col gap-2.5 lg:w-90 lg:shrink-0">
        <h2
          id="perguntas-titulo"
          className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink lg:text-[38px] lg:leading-[1.1] lg:tracking-[-0.025em]"
        >
          Perguntas frequentes
        </h2>
        <p className="hidden text-[15px] leading-normal text-ink-2 lg:block">
          Ficou alguma dúvida? Fale com a gente em{" "}
          <a href={`mailto:${EMAIL}`} className="underline-offset-2 hover:underline">
            {EMAIL}
          </a>
          .
        </p>
      </div>
      <ListGroup className="lg:flex-1">
        {PERGUNTAS.map((p) => (
          <div
            key={p.pergunta}
            className="flex flex-col gap-1 px-4 py-3.5 lg:gap-1.5 lg:px-6 lg:py-5"
          >
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink lg:text-[17px]">
              {p.pergunta}
            </h3>
            <p className="text-sm leading-[1.45] text-ink-2 lg:text-[15px] lg:leading-normal">
              {p.resposta}
            </p>
          </div>
        ))}
      </ListGroup>
    </section>
  );
}
