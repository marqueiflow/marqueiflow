// CLI-04 — Horário cancelado (só a tela; dados de exemplo do Figma 10)
import { useNavigate } from "react-router";
import { ResultadoAgendamento } from "@/presentation/components/agendamento/ResultadoAgendamento";
import { Button } from "@/presentation/components/ui/Button";
import fecharIcon from "@/presentation/assets/icons/fechar-28.svg";

// Exemplo até existir back-end.
const SLUG = "rafabarber";

export default function CanceladoPage() {
  const navigate = useNavigate();

  return (
    <ResultadoAgendamento
      selo={{ icone: fecharIcon, className: "bg-line" }}
      titulo="Horário cancelado."
      texto="O horário voltou para a agenda do Rafa e ele foi avisado."
      linhas={[
        { label: "Era", valor: "Seg 9/11, 17:00", riscado: true },
        { label: "Serviço", valor: "Corte + barba" },
      ]}
      aviso={
        <p className="rounded-[14px] bg-accent-soft px-3.5 py-3 text-[13px] leading-[1.45] text-ink-2">
          Pagou sinal? A devolução é combinada direto com o Rafa.
        </p>
      }
      acoes={
        <>
          <Button className="w-full" onClick={() => navigate(`/${SLUG}/agendar`)}>
            Agendar outro horário
          </Button>
          {/* TODO(CLI-04): WhatsApp do profissional. */}
          <Button variant="texto" className="w-full">
            Falar com o Rafa no WhatsApp
          </Button>
        </>
      }
    />
  );
}
