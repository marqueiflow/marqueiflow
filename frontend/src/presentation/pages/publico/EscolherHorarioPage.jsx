// BOOK-01 — Escolher horário (só a tela; dados de exemplo do Figma 02 e 11)
// /:slug/agendar mostra os horários; com ?estado=lotado, o dia de hoje aparece lotado.
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { SeletorDias } from "@/presentation/components/agendamento/SeletorDias";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { ListRow } from "@/presentation/components/ui/ListRow";
import { StepProgress } from "@/presentation/components/ui/StepProgress";
import { TimeSlot } from "@/presentation/components/ui/TimeSlot";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";

// Exemplo até existir back-end.
const DIAS = [
  { id: "9", semana: "Seg", dia: 9, curto: "Seg 9/11" },
  { id: "10", semana: "Ter", dia: 10, curto: "Ter 10/11" },
  { id: "11", semana: "Qua", dia: 11, curto: "Qua 11/11" },
  { id: "12", semana: "Qui", dia: 12, curto: "Qui 12/11" },
  { id: "13", semana: "Sex", dia: 13, curto: "Sex 13/11" },
  { id: "14", semana: "Sáb", dia: 14, curto: "Sáb 14/11" },
];

const PERIODOS = [
  {
    id: "tarde",
    titulo: "Tarde",
    horarios: [
      { hora: "16:30" },
      { hora: "17:00" },
      { hora: "17:30", ocupado: true },
      { hora: "18:00" },
    ],
  },
  {
    id: "noite",
    titulo: "Noite",
    horarios: [
      { hora: "18:30" },
      { hora: "19:00", ocupado: true },
      { hora: "19:30", ocupado: true },
      { hora: "20:00", ocupado: true },
    ],
  },
];

export default function EscolherHorarioPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [dia, setDia] = useState("9");
  const [hora, setHora] = useState("17:00");

  // Exemplo do Figma 11: com ?estado=lotado, a segunda (9) aparece sem horários.
  const diaLotado = params.get("estado") === "lotado" ? "9" : null;
  const lotado = dia === diaLotado;
  const semHora = lotado || !hora;
  const diaEscolhido = DIAS.find((d) => d.id === dia);

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar"
          onClick={() => navigate(`/${slug}`)}
          className="rounded-2xl"
        />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">
          Escolha o horário
        </h1>
      </header>
      <StepProgress current={1} total={3} className="px-5 py-1" />

      <main className="flex flex-1 flex-col gap-4 overflow-x-hidden px-5 pt-3 pb-4 leading-[normal]">
        <ListGroup>
          <ListRow
            rowClassName="py-4.5"
            title="Corte + barba"
            description="50 min · Rafa Barber"
            trailing="R$ 60"
          />
        </ListGroup>

        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Novembro</h2>
          <p className="text-[13px] font-medium text-ink-2">Próximos 14 dias</p>
        </div>

        <SeletorDias dias={DIAS} value={dia} onChange={setDia} />

        {lotado ? (
          <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface px-4.5 pt-5 pb-4.5">
            <h2 className="text-xl font-semibold tracking-[-0.4px] text-ink">Hoje está lotado.</h2>
            <p className="text-sm leading-[1.45] text-ink-2">
              O próximo horário livre para Corte + barba é amanhã, ter 10/11, às 09:00.
            </p>
            <Button
              variant="secundario"
              className="w-full"
              onClick={() => {
                setDia("10");
                setHora(null);
              }}
            >
              Ver terça, 10/11
            </Button>
          </section>
        ) : (
          <>
            {PERIODOS.map((p) => (
              <section key={p.id} className="flex flex-col gap-4">
                <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">
                  {p.titulo}
                </h2>
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

            <p className="text-[13px] leading-[1.4] text-ink-2">
              Só aparecem horários livres para os 50 min deste serviço.
            </p>
          </>
        )}
      </main>

      <footer className="sticky bottom-0 bg-paper px-5 pt-3 pb-8.5">
        <Button
          className="w-full disabled:opacity-35"
          disabled={semHora}
          onClick={() => navigate(`/${slug}/agendar/dados`)}
        >
          {semHora ? "Escolha um horário" : `Continuar · ${diaEscolhido.curto}, ${hora}`}
        </Button>
      </footer>
    </div>
  );
}
