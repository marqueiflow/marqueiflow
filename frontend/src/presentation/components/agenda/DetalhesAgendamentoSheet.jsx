// AG-01 — Modal P1 · Detalhes do agendamento (só a tela; dados de exemplo do Figma)
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { StatusBadge } from "@/presentation/components/ui/StatusBadge";
import lapisIcon from "@/presentation/assets/icons/lapis-18.svg";
import relogioIcon from "@/presentation/assets/icons/relogio-18.svg";

/**
 * agendamento: { cliente, contato, status, servico, horario, valor, sinal }.
 * Os botões só fecham a folha nesta fase (sem regra).
 */
export function DetalhesAgendamentoSheet({ agendamento, onClose }) {
  const a = agendamento;
  const linhas = a
    ? [
        { label: "Serviço", valor: a.servico, icone: lapisIcon },
        { label: "Horário", valor: a.horario, icone: relogioIcon },
        { label: "Valor", valor: a.valor },
        { label: "Sinal", valor: a.sinal },
      ]
    : [];

  return (
    <BottomSheet open={Boolean(a)} onClose={onClose} title={a?.cliente} description={a?.contato}>
      {a && (
        <>
          <div className="flex">
            <StatusBadge status={a.status} />
          </div>

          <ListGroup inset className="leading-[normal]">
            {linhas.map((l) => (
              <div
                key={l.label}
                className="flex items-center gap-2.5 py-[13px] pr-3.5 pl-4 text-sm"
              >
                {l.icone && (
                  <img src={l.icone} alt="" width={18} height={18} className="shrink-0" />
                )}
                <span className="min-w-0 flex-1 text-ink-2">{l.label}</span>
                <span className="font-semibold text-ink">{l.valor}</span>
              </div>
            ))}
          </ListGroup>

          {/* TODO(AG-01): ações de verdade quando houver back-end. */}
          <div className="flex flex-col gap-2.5">
            {a.status === "aguardando-sinal" && (
              <Button className="w-full" onClick={onClose}>
                Marcar sinal recebido
              </Button>
            )}
            <div className="flex gap-2.5">
              <Button variant="secundario" className="flex-1" onClick={onClose}>
                Atendido
              </Button>
              <Button variant="secundario" className="flex-1" onClick={onClose}>
                Faltou
              </Button>
            </div>
            <Button variant="texto" className="w-full text-danger" onClick={onClose}>
              Cancelar horário
            </Button>
          </div>
        </>
      )}
    </BottomSheet>
  );
}
