// AJ-03 — Confirmar exclusão de serviço (só a tela; segue o modal C1 · Cancelar horário)
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";

/**
 * Pede confirmação antes de excluir um serviço.
 * nome: o serviço; onConfirmar: excluiu; onClose: manteve.
 */
export function ExcluirServicoSheet({ open, onClose, onConfirmar, nome }) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Excluir este serviço?"
      description={`“${nome}” sai do seu link. Quem já marcou continua com o horário.`}
      className="gap-5"
    >
      <div className="flex flex-col gap-2.5">
        <Button variant="perigo" className="w-full" onClick={onConfirmar}>
          Excluir serviço
        </Button>
        <Button variant="secundario" className="w-full" onClick={onClose}>
          Manter serviço
        </Button>
      </div>
    </BottomSheet>
  );
}
