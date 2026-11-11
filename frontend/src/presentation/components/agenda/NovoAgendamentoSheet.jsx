// AG-01 — Modal P2 · Novo agendamento (só a tela; dados de exemplo do Figma)
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { TextField } from "@/presentation/components/ui/TextField";
import lapisIcon from "@/presentation/assets/icons/lapis-18.svg";
import calendarioIcon from "@/presentation/assets/icons/calendario-18.svg";
import relogioIcon from "@/presentation/assets/icons/relogio-18.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

/**
 * Para o profissional marcar quem pediu por mensagem ou ligação.
 * dia/horario: o dia e o horário que vem escolhido (ex.: o "Marcar" de um horário livre). Fecha ao marcar.
 */
export function NovoAgendamentoSheet({ open, onClose, dia = "Hoje, seg 9/11", horario = "17:30" }) {
  const [cliente, setCliente] = useState("");

  // TODO(AG-01): escolher serviço, dia e horário.
  const escolhas = [
    { label: "Serviço", valor: "Corte · 30 min", icone: lapisIcon },
    { label: "Dia", valor: dia, icone: calendarioIcon },
    { label: "Horário", valor: horario, icone: relogioIcon },
  ];

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Novo agendamento"
      description="Para quem marcou por mensagem ou ligação."
    >
      <TextField
        label="Cliente"
        placeholder="Ana Ribeiro"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        hint="Nome ou WhatsApp — se já for cliente, aparece aqui."
      />

      <ListGroup inset className="leading-[normal]">
        {escolhas.map((e) => (
          <button
            key={e.label}
            type="button"
            className="flex pressable items-center gap-2.5 py-[13px] pr-3.5 pl-4 text-left text-sm active:scale-100 active:bg-paper"
          >
            <img src={e.icone} alt="" width={18} height={18} className="shrink-0" />
            <span className="min-w-0 flex-1 text-ink-2">{e.label}</span>
            <span className="font-semibold text-ink">{e.valor}</span>
            <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
          </button>
        ))}
      </ListGroup>

      <Button className="w-full" onClick={onClose}>
        Marcar horário
      </Button>

      <p className="rounded-[14px] bg-paper px-3.5 py-3 text-[13px] leading-[1.45] text-ink-2">
        Depois de salvar, um toque envia a confirmação para o WhatsApp da cliente.
      </p>
    </BottomSheet>
  );
}
