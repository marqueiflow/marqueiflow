import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import { TimeSlot } from "@/presentation/components/ui/TimeSlot";

// Exemplo ilustrativo da agenda (Figma · Landing page).
const HORARIOS = [
  { hora: "16:30", estado: "livre" },
  { hora: "17:00", estado: "selecionado" },
  { hora: "17:30", estado: "indisponivel" },
  { hora: "18:00", estado: "livre" },
];

/** Chamada principal: título, texto, botão de criar e a prévia da agenda. */
export function LandingHero() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-texto">
        <p className="landing-hero-selo">Agenda online para autônomos</p>
        <h1 className="landing-hero-titulo">Sua agenda cheia, sem ficar trocando mensagem.</h1>
        <p className="landing-hero-subtitulo">
          Um link para seus clientes marcarem sozinhos. Você só aparece para atender.
        </p>
        <div className="landing-hero-acao">
          <Button as={Link} to="/criar-conta" className="landing-hero-botao">
            Criar minha agenda grátis
          </Button>
          <p className="landing-hero-nota">Grátis, sem mensalidade e sem cartão.</p>
        </div>
      </div>

      <div aria-hidden="true" className="landing-previa">
        <div className="landing-previa-proximo">
          <p className="landing-previa-proximo-rotulo">Próximo · em 25 min</p>
          <p className="landing-previa-proximo-titulo">
            16:30<span className="landing-previa-proximo-nome">Lucas Andrade</span>
          </p>
          <p className="landing-previa-proximo-detalhe">Corte + barba · sinal pago</p>
        </div>
        <div className="landing-previa-agenda">
          <p className="landing-previa-agenda-rotulo">Hoje · 6 atendimentos</p>
          <div className="landing-previa-horarios">
            {HORARIOS.map((h) => (
              <TimeSlot
                key={h.hora}
                time={h.hora}
                state={h.estado}
                className="landing-previa-horario"
              />
            ))}
          </div>
          <div className="landing-previa-aviso">
            <p className="landing-previa-aviso-texto">Lucas marcou 17:00</p>
            <StatusBadge status="confirmado" />
          </div>
        </div>
      </div>
    </section>
  );
}
