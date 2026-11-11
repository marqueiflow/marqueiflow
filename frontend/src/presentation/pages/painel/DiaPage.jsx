// AG-04 — Um dia da semana (só a tela; dados de exemplo)
// Aberto pela Semana: /painel/semana/10 mostra os atendimentos de 10 de novembro.
// Hoje continua sendo /painel; dia fechado mostra o aviso; dia que não existe volta para a Semana.
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { AgendaDoDia } from "@/presentation/components/agenda/AgendaDoDia";
import { DetalhesAgendamentoSheet } from "@/presentation/components/agenda/DetalhesAgendamentoSheet";
import { NovoAgendamentoSheet } from "@/presentation/components/agenda/NovoAgendamentoSheet";
import {
  acharDia,
  atendimentosDoDia,
  HOJE,
  primeiroLivre,
} from "@/presentation/components/agenda/semanasExemplo";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { Button } from "@/presentation/components/ui/Button";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import maisIcon from "@/presentation/assets/icons/mais-20.svg";

const paraDetalhes = (item) => ({
  cliente: item.cliente,
  status: item.status,
  servico: item.servico,
  ...item.detalhes,
});

export default function DiaPage() {
  const { dia: numero } = useParams();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(null);
  const [novo, setNovo] = useState(false);

  const dia = acharDia(numero);
  if (!dia) return <Navigate to="/painel/semana" replace />;
  if (dia.dia === HOJE) return <Navigate to="/painel" replace />;

  const passou = dia.dia < HOJE;
  const itens = atendimentosDoDia(dia);
  const livres = dia.fechado ? 0 : dia.total - dia.ocupados;
  const livre = passou ? undefined : primeiroLivre(dia);
  const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

  return (
    <PainelLayout aba="agenda">
      <header className="flex items-center gap-3">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar para a semana"
          onClick={() => navigate("/painel/semana")}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-[13px] font-medium text-ink-2">{dia.dia} de novembro</p>
          <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink">
            {dia.nome}
          </h1>
        </div>
        {livre && (
          <IconButton
            icon={maisIcon}
            label="Novo agendamento"
            onClick={() => setNovo(true)}
            className="size-11 border-0 bg-ink before:hidden"
          />
        )}
      </header>

      {dia.fechado ? (
        <section className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-4.5">
          <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Fechado</h2>
          <p className="text-sm leading-[1.45] text-ink-2">
            Você não atende aos {dia.nome.toLowerCase()}s, então ninguém consegue marcar nesse dia.
          </p>
          <Button as={Link} to="/painel/ajustes/horarios" variant="secundario" className="w-full">
            Mudar horários
          </Button>
        </section>
      ) : (
        <>
          <p className="text-sm text-ink-2">
            {passou
              ? plural(itens.length, "atendimento realizado", "atendimentos realizados")
              : `${plural(itens.length, "atendimento", "atendimentos")} · ${plural(livres, "horário livre", "horários livres")}`}
          </p>
          <AgendaDoDia itens={itens} onAbrir={(item) => setAberto(paraDetalhes(item))} />
        </>
      )}

      <DetalhesAgendamentoSheet agendamento={aberto} onClose={() => setAberto(null)} />
      {livre && (
        <NovoAgendamentoSheet
          open={novo}
          onClose={() => setNovo(false)}
          dia={`${dia.semana.toLowerCase()} ${dia.dia}/11`}
          horario={livre}
        />
      )}
    </PainelLayout>
  );
}
