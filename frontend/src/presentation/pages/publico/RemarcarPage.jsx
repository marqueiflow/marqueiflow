// CLI-03 — Remarcar (só a tela; dados de exemplo do Figma)
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SeletorDias } from "@/presentation/components/agendamento/SeletorDias";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { TimeSlot } from "@/presentation/components/ui/TimeSlot";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";

// Exemplo até existir back-end.
const DIAS = [
  { id: "9", semana: "Seg", dia: 9, curto: "seg 9/11" },
  { id: "10", semana: "Ter", dia: 10, curto: "ter 10/11" },
  { id: "11", semana: "Qua", dia: 11, curto: "qua 11/11" },
  { id: "12", semana: "Qui", dia: 12, curto: "qui 12/11" },
  { id: "13", semana: "Sex", dia: 13, curto: "sex 13/11" },
  { id: "14", semana: "Sáb", dia: 14, curto: "sáb 14/11" },
];

const PERIODOS = [
  {
    id: "manha",
    titulo: "Manhã",
    horarios: [
      { hora: "09:00" },
      { hora: "09:30", ocupado: true },
      { hora: "10:30" },
      { hora: "11:00" },
    ],
  },
  {
    id: "tarde",
    titulo: "Tarde",
    horarios: [
      { hora: "16:00" },
      { hora: "17:00", ocupado: true },
      { hora: "18:00" },
      { hora: "18:30" },
    ],
  },
];

export default function RemarcarPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [dia, setDia] = useState("10");
  const [hora, setHora] = useState("18:00");

  const diaEscolhido = DIAS.find((d) => d.id === dia);
  const voltar = () => navigate(`/a/${token}`);

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton icon={voltarIcon} iconSize={18} label="Voltar" onClick={voltar} />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">Remarcar</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4.5 overflow-x-hidden px-5 pt-3 pb-4 leading-[normal]">
        <section className="flex items-center justify-between gap-3 rounded-[14px] border border-line px-3.5 py-3 text-ink-2">
          <p className="flex gap-2 text-sm">
            Atual:
            <span className="font-medium line-through">Seg 9/11, 17:00</span>
          </p>
          <p className="truncate text-[13px]">Corte + barba · 50 min</p>
        </section>

        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Novembro</h2>
          <p className="text-[13px] font-medium text-ink-2">Próximos 14 dias</p>
        </div>

        <SeletorDias dias={DIAS} value={dia} onChange={setDia} />

        {PERIODOS.map((p) => (
          <section key={p.id} className="flex flex-col gap-4.5">
            <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">{p.titulo}</h2>
            <div className="grid grid-cols-4 gap-2">
              {p.horarios.map((h) => (
                <TimeSlot
                  key={h.hora}
                  time={h.hora}
                  className="w-full"
                  state={h.ocupado ? "indisponivel" : h.hora === hora ? "selecionado" : "livre"}
                  onSelect={() => setHora(h.hora)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="sticky bottom-0 flex flex-col items-center gap-2.5 bg-paper px-5 pt-3 pb-8.5">
        <p className="text-center text-[13px] leading-[1.4] text-ink-2">
          O Rafa recebe um aviso. O sinal pago continua valendo.
        </p>
        <Button className="w-full" onClick={() => navigate(`/a/${token}/remarcado`)}>
          Trocar para {diaEscolhido.curto}, {hora}
        </Button>
      </footer>
    </div>
  );
}
