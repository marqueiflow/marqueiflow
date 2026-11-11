// PUB-01 — Página do profissional (só a tela; dados de exemplo do Figma 01 e 13)
// Com ?estado=pausada, mostra a agenda pausada (férias) e os serviços sem dar para agendar.
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/presentation/utils/cn";
import pausaIcon from "@/presentation/assets/icons/pausa-16.svg";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { ListRow } from "@/presentation/components/ui/ListRow";
import { Logo } from "@/presentation/components/ui/Logo";
import { LinksLegais } from "@/presentation/components/legal/LinksLegais";

// Exemplo até existir back-end.
const PROFISSIONAL = {
  iniciais: "RB",
  nome: "Rafa Barber",
  descricao: "Barbearia no centro de Campinas",
  horario: "Seg a Sáb · 9h às 19h",
  endereco: "R. Barão de Jaguara, 1200 · Centro",
  proximoLivre: "Hoje, 16:30",
  fotosExtras: 3,
};

const SERVICOS = [
  { id: "1", nome: "Corte", detalhe: "30 min", preco: "R$ 40" },
  { id: "2", nome: "Corte + barba", detalhe: "50 min · sinal de R$ 18", preco: "R$ 60" },
  { id: "3", nome: "Barba", detalhe: "20 min", preco: "R$ 25" },
];

const acao = "-my-3 flex h-11 pressable items-center text-sm font-semibold text-accent-strong";

export default function ProfissionalPage() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const pausada = params.get("estado") === "pausada";
  const agendar = `/${slug}/agendar`;

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className="flex flex-1 flex-col gap-5 px-5 pt-3 leading-[normal]">
        <header className="flex items-center gap-3.5">
          <span className="flex size-15 shrink-0 items-center justify-center rounded-full bg-ink text-xl font-semibold tracking-[-0.4px] text-surface">
            {PROFISSIONAL.iniciais}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h1 className="text-2xl leading-[1.2] font-semibold tracking-[-0.48px] text-ink">
              {PROFISSIONAL.nome}
            </h1>
            <p className="text-sm text-ink-2">{PROFISSIONAL.descricao}</p>
          </div>
        </header>

        <section className="flex flex-col gap-1.5 py-1 text-sm">
          <p className="font-medium text-ink">{PROFISSIONAL.horario}</p>
          <p className="text-ink-2">{PROFISSIONAL.endereco}</p>
          {/* TODO(PUB-01): links reais do mapa e do WhatsApp do profissional. */}
          <div className="flex gap-4 pt-1.5">
            <button type="button" className={acao}>
              Abrir no mapa
            </button>
            <button type="button" className={acao}>
              Falar no WhatsApp
            </button>
          </div>
        </section>

        {pausada ? (
          <section className="flex items-start gap-3 rounded-2xl bg-accent-soft px-4 py-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface">
              <img src={pausaIcon} alt="" width={16} height={16} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <h2 className="text-[15px] font-semibold tracking-[-0.15px] text-ink">
                Agenda pausada até 15/11
              </h2>
              <p className="text-[13px] leading-[1.45] text-ink-2">
                O Rafa está de férias. Novos horários abrem na volta — dá para falar com ele no
                WhatsApp.
              </p>
            </div>
          </section>
        ) : (
          <section className="flex items-center justify-between rounded-2xl bg-ink py-3.5 pr-3 pl-4.5">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-medium text-ink-3">Próximo horário livre</p>
              <p className="text-xl font-semibold tracking-[-0.4px] text-surface">
                {PROFISSIONAL.proximoLivre}
              </p>
            </div>
            <Link
              to={agendar}
              className="flex h-11 pressable items-center rounded-xl bg-accent px-4 text-[15px] font-semibold tracking-[-0.15px] text-ink"
            >
              Agendar
            </Link>
          </section>
        )}

        {/* TODO(PUB-01): fotos do portfólio. */}
        <section aria-label="Fotos" className="flex gap-2">
          {["Foto", "Foto", "Foto", `+${PROFISSIONAL.fotosExtras}`].map((rotulo, i) => (
            <div
              key={i}
              className="flex h-20 min-w-0 flex-1 items-center justify-center rounded-[14px] bg-line text-xs font-medium text-ink-2"
            >
              {rotulo}
            </div>
          ))}
        </section>

        <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Serviços</h2>
        <ListGroup className={cn(pausada && "opacity-55")}>
          {SERVICOS.map((s) =>
            pausada ? (
              <ListRow key={s.id} title={s.nome} description={s.detalhe} trailing={s.preco} />
            ) : (
              <Link key={s.id} to={agendar} className="pressable active:scale-100 active:bg-paper">
                <ListRow title={s.nome} description={s.detalhe} trailing={s.preco} />
              </Link>
            ),
          )}
        </ListGroup>
      </main>

      <footer className="flex flex-col items-center gap-2.5 px-5 pt-12 pb-8.5 leading-[normal]">
        <p className="flex items-center gap-1.5 text-[13px] text-ink-2">
          Agende também com
          <Logo as="span" className="text-[13px] leading-[normal] tracking-[-0.03em]" />· grátis
        </p>
        <LinksLegais />
      </footer>
    </div>
  );
}
