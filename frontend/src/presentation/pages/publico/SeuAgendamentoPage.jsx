// CLI-02 — Seu agendamento (só a tela; dados de exemplo do Figma)
// Com ?estado=prazo (faltam menos de 2h), Remarcar e Cancelar abrem o aviso C2 em vez de seguir.
// Trocar serviço abre o modal C5 e Meus dados, o C6; o que for escolhido muda só na tela.
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { CancelarHorarioSheet } from "@/presentation/components/agendamento/CancelarHorarioSheet";
import { MeusDadosSheet } from "@/presentation/components/agendamento/MeusDadosSheet";
import { PrazoEncerradoSheet } from "@/presentation/components/agendamento/PrazoEncerradoSheet";
import { TrocarServicoSheet } from "@/presentation/components/agendamento/TrocarServicoSheet";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import whatsappIcon from "@/presentation/assets/icons/whatsapp-18.svg";
import mapaIcon from "@/presentation/assets/icons/mapa-18.svg";
import calendarioIcon from "@/presentation/assets/icons/calendario-18-escuro.svg";
import trocarIcon from "@/presentation/assets/icons/trocar-18.svg";
import pessoaIcon from "@/presentation/assets/icons/pessoa-18.svg";
import calendarioMaisIcon from "@/presentation/assets/icons/calendario-mais-18.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

// Exemplo até existir back-end.
const SERVICOS = [
  { id: "corte", nome: "Corte", detalhe: "30 min", preco: "R$ 40", fim: "17:30", sinal: "R$ 12" },
  {
    id: "corte-barba",
    nome: "Corte + barba",
    detalhe: "50 min",
    preco: "R$ 60",
    fim: "17:50",
    sinal: "R$ 18",
  },
  {
    id: "barba-sobrancelha",
    nome: "Barba + sobrancelha",
    detalhe: "70 min · não cabe às 17:00",
    preco: "R$ 45",
    naoCabe: true,
  },
];

const linha =
  "flex pressable items-center gap-3 px-3.5 py-[13px] text-left active:scale-100 active:bg-paper";

export default function SeuAgendamentoPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const prazoEncerrado = params.get("estado") === "prazo";
  const [cancelando, setCancelando] = useState(false);
  const [avisoPrazo, setAvisoPrazo] = useState(false);
  const [trocando, setTrocando] = useState(false);
  const [servicoId, setServicoId] = useState("corte-barba");
  const servico = SERVICOS.find((s) => s.id === servicoId);
  const [editandoDados, setEditandoDados] = useState(false);
  const [dados, setDados] = useState({ nome: "Lucas Andrade", whatsapp: "(19) 9 8765-4321" });

  // Exemplo até existir back-end.
  const ALTERACOES = [
    {
      id: "remarcar",
      icone: calendarioIcon,
      titulo: "Remarcar",
      detalhe: "Outro dia ou horário",
      to: prazoEncerrado ? undefined : `/a/${token}/remarcar`,
      onClick: prazoEncerrado ? () => setAvisoPrazo(true) : undefined,
    },
    {
      id: "servico",
      icone: trocarIcon,
      titulo: "Trocar serviço",
      detalhe: servico.nome,
      onClick: () => (prazoEncerrado ? setAvisoPrazo(true) : setTrocando(true)),
    },
    {
      id: "dados",
      icone: pessoaIcon,
      titulo: "Meus dados",
      detalhe: `${dados.nome} · ${dados.whatsapp}`,
      onClick: () => setEditandoDados(true),
    },
    { id: "agenda", icone: calendarioMaisIcon, titulo: "Pôr na agenda do celular" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar"
          onClick={() => navigate("/meus-horarios")}
        />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">
          Seu agendamento
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-4.5 px-5 pt-3 pb-4 leading-[normal]">
        <section className="flex flex-col items-start gap-1.5">
          <StatusBadge status="confirmado" />
          <p className="text-[15px] font-medium text-ink-2">Segunda, 9 de novembro</p>
          <p className="text-4xl leading-[1.05] font-semibold tracking-[-1.08px] text-ink tabular-nums">
            17:00 – {servico.fim}
          </p>
          <p className="text-sm text-ink-2">
            {servico.nome} · {servico.preco} · sinal de {servico.sinal} pago
          </p>
        </section>

        <section className="flex items-center gap-3 rounded-2xl border border-line bg-surface py-3 pr-3 pl-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-[15px] font-semibold tracking-[-0.3px] text-surface">
            RB
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="truncate text-[15px] font-semibold tracking-[-0.15px] text-ink">
              Rafa Barber
            </p>
            <p className="truncate text-[13px] text-ink-2">R. Barão de Jaguara, 1200</p>
          </div>
          {/* TODO(CLI-02): WhatsApp e mapa do profissional. */}
          <IconButton
            icon={whatsappIcon}
            iconSize={18}
            label="Falar no WhatsApp"
            className="border-0 bg-paper"
          />
          <IconButton
            icon={mapaIcon}
            iconSize={18}
            label="Abrir no mapa"
            className="border-0 bg-paper"
          />
        </section>

        <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">
          Precisa mudar algo?
        </h2>
        <ListGroup dividerClassName="pl-[62px]">
          {ALTERACOES.map((a) => {
            const conteudo = (
              <>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-paper">
                  <img src={a.icone} alt="" width={18} height={18} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="truncate text-[15px] font-semibold tracking-[-0.15px] text-ink">
                    {a.titulo}
                  </span>
                  {a.detalhe && (
                    <span className="truncate text-[13px] text-ink-2">{a.detalhe}</span>
                  )}
                </span>
                <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
              </>
            );
            return a.to ? (
              <Link key={a.id} to={a.to} className={linha}>
                {conteudo}
              </Link>
            ) : (
              <button key={a.id} type="button" className={linha} onClick={a.onClick}>
                {conteudo}
              </button>
            );
          })}
        </ListGroup>

        <p className="text-[13px] leading-[1.4] text-ink-2">
          Você pode alterar ou cancelar até seg, 15:00 (2h antes).
        </p>
      </main>

      <footer className="flex flex-col px-5 pt-3 pb-8.5">
        <Button
          variant="texto"
          className="w-full text-danger"
          onClick={() => (prazoEncerrado ? setAvisoPrazo(true) : setCancelando(true))}
        >
          Cancelar agendamento
        </Button>
      </footer>

      <PrazoEncerradoSheet open={avisoPrazo} onClose={() => setAvisoPrazo(false)} />
      <TrocarServicoSheet
        key={`${servicoId}-${trocando}`}
        open={trocando}
        onClose={() => setTrocando(false)}
        servicos={SERVICOS}
        atual={servicoId}
        onTrocar={(novo) => {
          setServicoId(novo.id);
          setTrocando(false);
        }}
      />
      <MeusDadosSheet
        key={String(editandoDados)}
        open={editandoDados}
        onClose={() => setEditandoDados(false)}
        dados={dados}
        onSalvar={(novos) => {
          setDados(novos);
          setEditandoDados(false);
        }}
      />
      <CancelarHorarioSheet
        open={cancelando}
        onClose={() => setCancelando(false)}
        onConfirmar={() => navigate(`/a/${token}/cancelado`)}
      />
    </div>
  );
}
