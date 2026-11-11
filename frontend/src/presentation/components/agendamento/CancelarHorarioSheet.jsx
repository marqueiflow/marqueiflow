// CLI-04 — Modal C1 · Cancelar horário (só a tela; dados de exemplo do Figma)
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import whatsappIcon from "@/presentation/assets/icons/whatsapp-18-cinza.svg";

// Exemplo até existir back-end.
const RESUMO = [
  { label: "Serviço", valor: "Corte + barba" },
  { label: "Quando", valor: "Seg 9/11, 17:00" },
  { label: "Sinal pago", valor: "R$ 18" },
];

/** Pede confirmação antes de cancelar. onConfirmar: cancelou; onClose: manteve o horário. */
export function CancelarHorarioSheet({ open, onClose, onConfirmar }) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Cancelar este horário?"
      description="O horário volta para a agenda do Rafa e ele recebe um aviso."
      className="gap-5"
    >
      <section className="flex flex-col gap-2.5 rounded-2xl border border-line px-4 py-3.5 text-sm leading-[normal]">
        {RESUMO.map((r) => (
          <p key={r.label} className="flex justify-between gap-3">
            <span className="text-ink-2">{r.label}</span>
            <span className="font-semibold tracking-[-0.14px] text-ink">{r.valor}</span>
          </p>
        ))}
      </section>

      <section className="flex items-start gap-2.5 rounded-[14px] bg-paper px-3.5 py-3">
        <img src={whatsappIcon} alt="" width={18} height={18} className="shrink-0" />
        <p className="min-w-0 flex-1 text-[13px] leading-[1.45] text-ink-2">
          Sobre o sinal, vale o combinado com o Rafa. Na dúvida, fale com ele antes de cancelar.
        </p>
      </section>

      <div className="flex flex-col gap-2.5">
        <Button variant="perigo" className="w-full" onClick={onConfirmar}>
          Cancelar horário
        </Button>
        <Button variant="secundario" className="w-full" onClick={onClose}>
          Manter horário
        </Button>
      </div>
    </BottomSheet>
  );
}
