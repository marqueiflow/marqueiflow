// AG-01 — Agenda de hoje (só a tela; dados de exemplo do Figma)
// /painel mostra o dia com atendimentos; /painel?estado=vazia, o primeiro dia sem nenhum.
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { AgendaVazia } from "@/presentation/components/agenda/AgendaVazia";
import { ProximoAtendimento } from "@/presentation/components/agenda/ProximoAtendimento";
import { AgendaDoDia } from "@/presentation/components/agenda/AgendaDoDia";
import { DetalhesAgendamentoSheet } from "@/presentation/components/agenda/DetalhesAgendamentoSheet";
import { NovoAgendamentoSheet } from "@/presentation/components/agenda/NovoAgendamentoSheet";
import { LembreteSheet } from "@/presentation/components/agenda/LembreteSheet";
import { IconButton } from "@/presentation/components/ui/IconButton";
import maisIcon from "@/presentation/assets/icons/mais-20.svg";

// Exemplo até existir back-end.
// detalhes: o que aparece no modal P1 ao tocar no atendimento.
const PROXIMO = {
  cliente: "Lucas Andrade",
  contato: "(19) 9 8765-4321 · 8ª visita",
  status: "confirmado",
  servico: "Corte + barba · 50 min",
  horario: "Hoje, 16:30",
  valor: "R$ 60",
  sinal: "R$ 18 · recebido",
};

// Mensagem do lembrete (modal P3).
const LEMBRETE = [
  "Oi, Lucas! Passando para lembrar do seu horário hoje às 16:30 — Corte + barba, na Rafa Barber.",
  "Precisa remarcar? marqueiflow.com.br/rafabarber",
].join("\n");

const MAIS_TARDE = [
  {
    hora: "17:00",
    cliente: "Marcos Lima",
    servico: "Corte · 30 min",
    status: "aguardando-sinal",
    detalhes: {
      contato: "(19) 9 8123-4567 · 5ª visita",
      horario: "Hoje, 17:00",
      valor: "R$ 40",
      sinal: "R$ 12 · não recebido",
    },
  },
  { hora: "17:30", livre: true },
  {
    hora: "18:00",
    cliente: "Pedro Alves",
    servico: "Barba · 20 min",
    status: "confirmado",
    detalhes: {
      contato: "(19) 9 9234-5678 · 11ª visita",
      horario: "Hoje, 18:00",
      valor: "R$ 25",
      sinal: "Sem sinal",
    },
  },
  {
    hora: "18:30",
    cliente: "João Souza",
    servico: "Corte + barba · 50 min",
    status: "confirmado",
    detalhes: {
      contato: "(19) 9 9345-6789 · 3ª visita",
      horario: "Hoje, 18:30",
      valor: "R$ 60",
      sinal: "R$ 18 · recebido",
    },
  },
];

const paraDetalhes = (item) => ({
  cliente: item.cliente,
  status: item.status,
  servico: item.servico,
  ...item.detalhes,
});

export default function AgendaHojePage() {
  const [params] = useSearchParams();
  const vazia = params.get("estado") === "vazia";
  const [aberto, setAberto] = useState(null);
  // P2: null = fechado; senão, o horário que já vem escolhido.
  const [novoEm, setNovoEm] = useState(null);
  const [lembrando, setLembrando] = useState(false);

  return (
    <PainelLayout aba="agenda">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-medium text-ink-2">Segunda, 9 de novembro</p>
          <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink">
            Hoje
          </h1>
        </div>
        <IconButton
          icon={maisIcon}
          label="Novo agendamento"
          onClick={() => setNovoEm("17:30")}
          className="size-11 border-0 bg-ink before:hidden"
        />
      </header>

      {vazia ? (
        <AgendaVazia />
      ) : (
        <>
          <p className="text-sm text-ink-2">6 atendimentos · R$ 340 previstos · 1 sinal pendente</p>

          <ProximoAtendimento
            quando="em 25 min"
            hora="16:30"
            cliente="Lucas Andrade"
            detalhe="Corte + barba · sinal pago"
            onLembrete={() => setLembrando(true)}
            onDetalhes={() => setAberto(PROXIMO)}
          />

          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Mais tarde</h2>
              <Link
                to="/painel/semana"
                className="-my-3 flex h-11 pressable items-center text-sm font-semibold text-accent-strong"
              >
                Ver semana
              </Link>
            </div>
            <AgendaDoDia
              itens={MAIS_TARDE}
              onAbrir={(item) => setAberto(paraDetalhes(item))}
              onMarcar={(item) => setNovoEm(item.hora)}
            />
          </section>
        </>
      )}

      <DetalhesAgendamentoSheet agendamento={aberto} onClose={() => setAberto(null)} />
      <LembreteSheet
        open={lembrando}
        onClose={() => setLembrando(false)}
        cliente="Lucas"
        mensagem={LEMBRETE}
      />
      <NovoAgendamentoSheet
        key={novoEm}
        open={novoEm !== null}
        horario={novoEm ?? undefined}
        onClose={() => setNovoEm(null)}
      />
    </PainelLayout>
  );
}
