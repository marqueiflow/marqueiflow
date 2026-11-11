// CLI-03 — Horário remarcado (só a tela; dados de exemplo do Figma 09)
import { useNavigate, useParams } from "react-router";
import { ResultadoAgendamento } from "@/presentation/components/agendamento/ResultadoAgendamento";
import { Button } from "@/presentation/components/ui/Button";
import trocarIcon from "@/presentation/assets/icons/trocar-28.svg";

export default function RemarcadoPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  return (
    <ResultadoAgendamento
      selo={{ icone: trocarIcon, className: "bg-success-soft" }}
      titulo="Horário remarcado."
      texto="O Rafa já foi avisado. O sinal pago continua valendo."
      linhas={[
        { label: "Antes", valor: "Seg 9/11, 17:00", riscado: true },
        { label: "Agora", valor: "Ter 10/11, 18:00" },
        { label: "Serviço", valor: "Corte + barba" },
      ]}
      acoes={
        <>
          <Button className="w-full" onClick={() => navigate(`/a/${token}`)}>
            Ver meu agendamento
          </Button>
          {/* TODO(CLI-03): gerar o evento para a agenda do celular. */}
          <Button variant="texto" className="w-full">
            Pôr na agenda do celular
          </Button>
        </>
      }
    />
  );
}
