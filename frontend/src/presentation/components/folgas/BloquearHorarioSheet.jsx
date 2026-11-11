// AJ-06 — Modais P4 · Bloquear horário e P8 · Editar bloqueio (só a tela; valores de exemplo do Figma)
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { ChoiceChips } from "@/presentation/components/ui/ChoiceChips";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { TextField } from "@/presentation/components/ui/TextField";
import calendarioIcon from "@/presentation/assets/icons/calendario-18.svg";
import relogioIcon from "@/presentation/assets/icons/relogio-18.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

const tipos = [
  { value: "periodo", label: "Período" },
  { value: "dia", label: "Dia inteiro" },
  { value: "varios", label: "Vários dias" },
];

// Exemplo até existir back-end.
const NOVO = {
  tipo: "periodo",
  dia: "Ter, 24 de novembro",
  das: "13:00",
  ate: "15:00",
  motivo: "",
};

/**
 * Sem "bloqueio": cria um bloqueio novo (P4).
 * Com "bloqueio" ({ tipo, dia, das, ate, motivo }): edita esse bloqueio (P8), com "Remover bloqueio".
 * Para trocar de bloqueio, mude a key (os campos começam com os valores dele).
 * onRemover: tocou em "Remover bloqueio".
 */
export function BloquearHorarioSheet({ open, onClose, bloqueio, onRemover }) {
  const inicial = bloqueio ?? NOVO;
  const [tipo, setTipo] = useState(inicial.tipo);
  const [motivo, setMotivo] = useState(inicial.motivo);

  // Dia inteiro não tem horas.
  const quando = [
    { id: "dia", icone: calendarioIcon, label: "Dia", valor: inicial.dia },
    { id: "das", icone: relogioIcon, label: "Das", valor: inicial.das ?? NOVO.das },
    { id: "ate", icone: relogioIcon, label: "Até", valor: inicial.ate ?? NOVO.ate },
  ].filter((q) => q.id === "dia" || tipo !== "dia");

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={bloqueio ? "Editar bloqueio" : "Bloquear horário"}
      description={
        bloqueio
          ? "Mude o dia ou as horas. Se remover, o horário volta para o seu link."
          : "Os horários somem do seu link. Quem já marcou não é afetado."
      }
    >
      <ChoiceChips label="Tipo de bloqueio" options={tipos} value={tipo} onChange={setTipo} />

      {/* TODO(AJ-06): escolher dia e horas. */}
      <ListGroup inset className="leading-[normal]">
        {quando.map((q) => (
          <button
            key={q.id}
            type="button"
            className="flex pressable items-center gap-2.5 py-[13px] pr-3.5 pl-4 text-left active:scale-100 active:bg-paper"
          >
            <img src={q.icone} alt="" width={18} height={18} className="shrink-0" />
            <span className="min-w-0 flex-1 text-sm text-ink-2">{q.label}</span>
            <span className="text-sm font-semibold tracking-[-0.14px] text-ink">{q.valor}</span>
            <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
          </button>
        ))}
      </ListGroup>

      <TextField
        label="Motivo (só você vê)"
        placeholder="Ex.: médico"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <Button className="w-full" onClick={onClose}>
          {bloqueio ? "Salvar alterações" : "Bloquear horário"}
        </Button>
        {bloqueio && (
          <Button variant="texto" className="w-full text-danger" onClick={onRemover}>
            Remover bloqueio
          </Button>
        )}
      </div>
    </BottomSheet>
  );
}
