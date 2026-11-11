// BOOK-03 — Modal C3 · Horário acabou de ser reservado (só a tela; dados de exemplo do Figma)
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { TimeSlot } from "@/presentation/components/ui/TimeSlot";

// Exemplo até existir back-end.
const LIVRES = ["17:30", "18:00", "18:30"];

/**
 * Avisa que outra pessoa pegou o horário e oferece os próximos livres.
 * onFicar(hora): ficou com outro horário; onOutrosDias: voltar para escolher outro dia.
 */
export function HorarioReservadoSheet({ open, onClose, onFicar, onOutrosDias }) {
  const [hora, setHora] = useState("18:00");

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Esse horário acabou de ser reservado"
      description="Alguém confirmou 17:00 antes de você. Estes ainda estão livres hoje:"
      className="gap-5"
      semFechar
    >
      <div className="grid grid-cols-3 gap-2">
        {LIVRES.map((h) => (
          <TimeSlot
            key={h}
            time={h}
            className="w-full"
            state={h === hora ? "selecionado" : "livre"}
            onSelect={() => setHora(h)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <Button className="w-full" onClick={() => onFicar(hora)}>
          Ficar com {hora}
        </Button>
        <Button variant="texto" className="w-full" onClick={onOutrosDias}>
          Ver outros dias
        </Button>
      </div>
    </BottomSheet>
  );
}
