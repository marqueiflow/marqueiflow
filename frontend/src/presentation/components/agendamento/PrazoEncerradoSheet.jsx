// CLI-02 — Modal C2 · Prazo para cancelar encerrado (só a tela; texto do Figma)
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";

/** Avisa que faltam menos de 2h e oferece falar com o profissional. */
export function PrazoEncerradoSheet({ open, onClose }) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Faltam menos de 2 horas"
      description="Por aqui não dá mais para cancelar ou remarcar este horário. Fale direto com o Rafa — ele pode liberar."
      className="gap-5"
    >
      <div className="flex flex-col gap-2.5">
        {/* TODO(CLI-02): WhatsApp do profissional. */}
        <Button className="w-full">Falar com o Rafa no WhatsApp</Button>
        <Button variant="texto" className="w-full" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </BottomSheet>
  );
}
