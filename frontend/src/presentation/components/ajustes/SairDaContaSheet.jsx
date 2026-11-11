// AJ-01 — Modal P7 · Sair da conta (só a tela; Figma · Modais)
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";

/** Pede confirmação antes de sair. onConfirmar: saiu; onClose: ficou na conta. */
export function SairDaContaSheet({ open, onClose, onConfirmar }) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Sair da conta?"
      description="Seu link continua no ar e os clientes seguem agendando. Você só precisa entrar de novo para ver a agenda."
    >
      <div className="flex flex-col gap-2.5">
        <Button variant="perigo" className="w-full" onClick={onConfirmar}>
          Sair
        </Button>
        <Button variant="secundario" className="w-full" onClick={onClose}>
          Voltar
        </Button>
      </div>
    </BottomSheet>
  );
}
