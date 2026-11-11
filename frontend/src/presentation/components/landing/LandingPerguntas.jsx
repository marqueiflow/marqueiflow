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
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="landing-perguntas">
      <div className="landing-perguntas-cabecalho">
        <h2 id="perguntas-titulo" className="landing-secao-titulo">
          Perguntas frequentes
        </h2>
        <p className="landing-perguntas-contato">
          Ficou alguma dúvida? Fale com a gente em{" "}
          <a href={`mailto:${EMAIL}`} className="landing-perguntas-email">
            {EMAIL}
          </a>
          .
        </p>
      </div>
      <ListGroup className="landing-perguntas-lista">
        {PERGUNTAS.map((p) => (
          <div key={p.pergunta} className="landing-pergunta">
            <h3 className="landing-pergunta-titulo">{p.pergunta}</h3>
            <p className="landing-pergunta-resposta">{p.resposta}</p>
          </div>
        ))}
      </ListGroup>
    </section>
  );
}
