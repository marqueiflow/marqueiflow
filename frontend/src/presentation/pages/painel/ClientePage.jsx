// CLT-02 — Detalhes do cliente (só a tela; Figma 11b · Detalhes do cliente)
// Nome, iniciais, WhatsApp, visitas e total vêm do cliente tocado na lista; o resto é o exemplo do Figma.
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { NovoAgendamentoSheet } from "@/presentation/components/agenda/NovoAgendamentoSheet";
import { acharCliente } from "@/presentation/components/clientes/clientesExemplo";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import { cn } from "@/presentation/utils/cn";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";

// Exemplo até existir back-end.
const PROXIMO = {
  quando: "Hoje, 16:30",
  detalhe: "Corte + barba · sinal pago",
  status: "confirmado",
};
const HISTORICO = [
  { data: "26/10", servico: "Corte + barba", valor: "R$ 60" },
  { data: "12/10", servico: "Corte", valor: "R$ 40" },
  { data: "28/09", servico: "Corte + barba", valor: "R$ 60" },
  { data: "14/09", servico: "Barba", valor: "R$ 25" },
];
const ANOTACAO = "Prefere máquina 1 nas laterais e tesoura em cima. Costuma vir às segundas.";

const abrirWhatsApp = () => window.open("https://wa.me/", "_blank", "noopener");

const TITULO = "text-[17px] font-semibold tracking-[-0.17px] text-ink";

export default function ClientePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agendando, setAgendando] = useState(false);
  const [anotacao, setAnotacao] = useState(ANOTACAO);
  const [editando, setEditando] = useState(false);

  const cliente = acharCliente(id);
  if (!cliente) return <Navigate to="/painel/clientes" replace />;

  const numeros = [
    { valor: cliente.visitas, rotulo: "Visitas" },
    { valor: cliente.total, rotulo: "Gasto total" },
    { valor: 0, rotulo: "Faltas" },
  ];

  return (
    <PainelLayout aba="clientes" className="gap-4 pt-0 leading-[normal]">
      <header className="-mb-1 flex h-13 items-center gap-3">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar para clientes"
          onClick={() => navigate("/painel/clientes")}
        />
        <p className={TITULO}>Cliente</p>
      </header>

      <section className="flex items-center gap-3.5">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-line text-[22px] font-semibold tracking-[-0.44px] text-ink">
          {cliente.iniciais}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <h1 className="text-2xl leading-[1.15] font-semibold tracking-[-0.6px] text-ink">
            {cliente.nome}
          </h1>
          <p className="text-sm text-ink-2">{cliente.whatsapp} · desde março</p>
        </div>
      </section>

      <div className="flex gap-2.5">
        <Button className="min-w-0 flex-1 px-3" onClick={abrirWhatsApp}>
          WhatsApp
        </Button>
        <Button
          variant="secundario"
          className="min-w-0 flex-1 px-3"
          onClick={() => setAgendando(true)}
        >
          Agendar
        </Button>
      </div>

      <dl className="flex items-center rounded-2xl border border-line bg-surface py-3.5">
        {numeros.map((n, i) => (
          <div
            key={n.rotulo}
            className={cn(
              "flex flex-1 flex-col-reverse items-center gap-0.5",
              i > 0 && "border-l border-line",
            )}
          >
            <dt className="text-xs text-ink-2">{n.rotulo}</dt>
            <dd className="text-xl font-semibold tracking-[-0.4px] text-ink tabular-nums">
              {n.valor}
            </dd>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-2.5">
        <h2 className={TITULO}>Próximo horário</h2>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface py-3.5 pr-3.5 pl-4">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[15px] font-semibold tracking-[-0.15px] text-ink">
              {PROXIMO.quando}
            </p>
            <p className="text-[13px] text-ink-2">{PROXIMO.detalhe}</p>
          </div>
          <StatusBadge status={PROXIMO.status} />
        </div>
      </section>

      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className={TITULO}>Histórico</h2>
          <p className="text-sm font-medium text-ink-2">{cliente.visitas} visitas</p>
        </div>
        <ListGroup inset>
          {HISTORICO.map((h) => (
            <p
              key={h.data}
              className="flex items-center gap-3.5 px-4 py-3.5 text-[15px] tracking-[-0.15px]"
            >
              <span className="w-[46px] shrink-0 font-semibold text-ink-2 tabular-nums">
                {h.data}
              </span>
              <span className="min-w-0 flex-1 text-ink">{h.servico}</span>
              <span className="shrink-0 font-semibold text-ink tabular-nums">{h.valor}</span>
            </p>
          ))}
        </ListGroup>
      </section>

      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className={TITULO}>Anotação</h2>
          <button
            type="button"
            onClick={() => setEditando((v) => !v)}
            className="-my-3 flex h-11 pressable items-center text-sm font-semibold text-accent-strong"
          >
            {editando ? "Pronto" : "Editar"}
          </button>
        </div>
        <div className="rounded-2xl border border-line bg-surface px-4 py-3.5 focus-within:border-ink">
          {editando ? (
            <textarea
              value={anotacao}
              onChange={(e) => setAnotacao(e.target.value)}
              aria-label="Anotação sobre o cliente"
              autoFocus
              onFocus={(e) => e.target.setSelectionRange(anotacao.length, anotacao.length)}
              className="field-sizing-content min-h-[2lh] w-full resize-none bg-transparent text-sm leading-[1.45] text-ink outline-none"
            />
          ) : (
            <p className="text-sm leading-[1.45] whitespace-pre-line text-ink">{anotacao}</p>
          )}
        </div>
      </section>

      <NovoAgendamentoSheet open={agendando} onClose={() => setAgendando(false)} />
    </PainelLayout>
  );
}
