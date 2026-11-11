// CLI-01 — Meus horários (só a tela; dados de exemplo do Figma)
import { Link } from "react-router";
import { LinksLegais } from "@/presentation/components/legal/LinksLegais";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";
import whatsappIcon from "@/presentation/assets/icons/whatsapp-18-cinza.svg";

// Exemplo até existir back-end (no app, vem do que ficou salvo neste celular).
const PROXIMO = {
  token: "exemplo",
  semana: "SEG",
  dia: 9,
  titulo: "17:00 · Corte + barba",
  onde: "Rafa Barber · Centro",
  status: "confirmado",
};

const ANTERIORES = [
  { id: "1", servico: "Corte", quando: "12 out · Rafa Barber", slug: "rafabarber" },
  { id: "2", servico: "Corte + barba", quando: "14 set · Rafa Barber", slug: "rafabarber" },
];

export default function MeusHorariosPage() {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className="flex flex-1 flex-col gap-4.5 px-5 py-4 leading-[normal]">
        <header className="flex flex-col gap-1">
          <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink">
            Meus horários
          </h1>
          <p className="text-sm text-ink-2">Salvos neste celular. Sem senha.</p>
        </header>

        <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Próximo</h2>
        <ListGroup>
          <Link
            to={`/a/${PROXIMO.token}`}
            className="flex pressable items-center gap-3.5 p-3.5 active:scale-100 active:bg-paper"
          >
            <span className="flex h-15 w-14 shrink-0 flex-col items-center justify-center rounded-[14px] bg-ink">
              <span className="text-[11px] font-medium tracking-[0.66px] text-ink-3">
                {PROXIMO.semana}
              </span>
              <span className="text-[22px] font-semibold tracking-[-0.44px] text-surface tabular-nums">
                {PROXIMO.dia}
              </span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-[3px]">
              <span className="truncate text-base font-semibold tracking-[-0.16px] text-ink">
                {PROXIMO.titulo}
              </span>
              <span className="truncate text-[13px] text-ink-2">{PROXIMO.onde}</span>
              <StatusBadge status={PROXIMO.status} />
            </span>
            <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
          </Link>
        </ListGroup>

        <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Anteriores</h2>
        <ListGroup inset>
          {ANTERIORES.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-3.5 pr-3.5 pl-4">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="truncate text-[15px] font-semibold tracking-[-0.15px] text-ink">
                  {a.servico}
                </p>
                <p className="truncate text-[13px] text-ink-2">{a.quando}</p>
              </div>
              <Link
                to={`/${a.slug}/agendar`}
                className="-my-3 flex h-11 shrink-0 pressable items-center text-sm font-semibold text-accent-strong"
              >
                Agendar de novo
              </Link>
            </div>
          ))}
        </ListGroup>

        <section className="flex items-start gap-2.5 rounded-[14px] border border-line px-3.5 py-3">
          <img src={whatsappIcon} alt="" width={18} height={18} className="shrink-0" />
          <p className="min-w-0 flex-1 text-[13px] leading-[1.45] text-ink-2">
            Trocou de celular? Peça o link do seu horário ao profissional pelo WhatsApp.
          </p>
        </section>
      </main>

      <footer className="flex justify-center px-5 pt-3 pb-8.5">
        <LinksLegais />
      </footer>
    </div>
  );
}
