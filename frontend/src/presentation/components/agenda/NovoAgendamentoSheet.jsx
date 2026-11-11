// AG-01 — Modal P2 · Novo agendamento (só a tela; dados de exemplo do Figma)
// Tocar em Serviço, Dia ou Horário abre as opções logo abaixo da linha; escolher uma fecha de novo.
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { ChoiceChips } from "@/presentation/components/ui/ChoiceChips";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { TextField } from "@/presentation/components/ui/TextField";
import { cn } from "@/presentation/utils/cn";
import lapisIcon from "@/presentation/assets/icons/lapis-18.svg";
import calendarioIcon from "@/presentation/assets/icons/calendario-18.svg";
import relogioIcon from "@/presentation/assets/icons/relogio-18.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

// Exemplo até existir back-end.
const SERVICOS = ["Corte · 30 min", "Corte + barba · 50 min", "Barba · 20 min"];
const DIAS = ["Hoje, seg 9/11", "Ter 10/11", "Qua 11/11", "Qui 12/11", "Sex 13/11", "Sáb 14/11"];
const HORAS = ["09:00", "10:30", "14:00", "15:30", "17:30", "18:00"];

const opcoes = (lista) => lista.map((v) => ({ value: v, label: v }));

/**
 * Para o profissional marcar quem pediu por mensagem ou ligação.
 * dia/horario: o dia e o horário que vem escolhido (ex.: o "Marcar" de um horário livre). Fecha ao marcar.
 */
export function NovoAgendamentoSheet({ open, onClose, dia = DIAS[0], horario = "17:30" }) {
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState(SERVICOS[0]);
  const [diaEscolhido, setDiaEscolhido] = useState(dia);
  const [hora, setHora] = useState(horario);
  // Qual linha está com as opções abertas: "servico", "dia", "hora" ou null.
  const [aberta, setAberta] = useState(null);

  // O dia e o horário que vieram de fora entram na lista se ainda não estiverem nela.
  const dias = [dia, ...DIAS.filter((d) => d.toLowerCase() !== dia.toLowerCase())];
  const horas = [...new Set([...HORAS, horario])].sort();

  const escolhas = [
    {
      id: "servico",
      label: "Serviço",
      icone: lapisIcon,
      valor: servico,
      lista: SERVICOS,
      onChange: setServico,
    },
    {
      id: "dia",
      label: "Dia",
      icone: calendarioIcon,
      valor: diaEscolhido,
      lista: dias,
      onChange: setDiaEscolhido,
    },
    {
      id: "hora",
      label: "Horário",
      icone: relogioIcon,
      valor: hora,
      lista: horas,
      onChange: setHora,
    },
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
        {escolhas.map((e) => {
          const estaAberta = aberta === e.id;
          return (
            <div key={e.id} className="flex flex-col">
              <button
                type="button"
                aria-expanded={estaAberta}
                onClick={() => setAberta(estaAberta ? null : e.id)}
                className="flex pressable items-center gap-2.5 py-[13px] pr-3.5 pl-4 text-left text-sm active:scale-100 active:bg-paper"
              >
                <img src={e.icone} alt="" width={18} height={18} className="shrink-0" />
                <span className="min-w-0 flex-1 text-ink-2">{e.label}</span>
                <span className="font-semibold text-ink">{e.valor}</span>
                <img
                  src={setaIcon}
                  alt=""
                  width={16}
                  height={16}
                  className={cn("shrink-0 transition-transform", estaAberta && "rotate-90")}
                />
              </button>
              {estaAberta && (
                <ChoiceChips
                  label={e.label}
                  options={opcoes(e.lista)}
                  value={e.valor}
                  onChange={(v) => {
                    e.onChange(v);
                    setAberta(null);
                  }}
                  className="px-4 pt-1 pb-3.5"
                />
              )}
            </div>
          );
        })}
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
