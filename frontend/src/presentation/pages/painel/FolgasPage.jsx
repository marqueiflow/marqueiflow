// AJ-06 — Ajustes › Folgas e bloqueios (só a tela; dados de exemplo do Figma 16b)
// Tocar num bloqueio abre o modal para editar ou remover; remover tira da lista só na tela.
import { useState } from "react";
import { useNavigate } from "react-router";
import { BloquearHorarioSheet } from "@/presentation/components/folgas/BloquearHorarioSheet";
import { DashedButton } from "@/presentation/components/ui/DashedButton";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import maisIcon from "@/presentation/assets/icons/mais.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

// Exemplo até existir back-end.
const GRUPOS = [
  {
    id: "proximos",
    titulo: "Próximos",
    itens: [
      {
        id: "1",
        dia: "Ter, 24 de novembro",
        detalhe: "13:00 – 15:00 · Médico",
        tipo: "periodo",
        das: "13:00",
        ate: "15:00",
        motivo: "Médico",
      },
    ],
  },
  {
    id: "passados",
    titulo: "Já passaram",
    passado: true,
    itens: [
      {
        id: "2",
        dia: "Seg, 2 de novembro",
        detalhe: "Dia inteiro · Feriado",
        tipo: "dia",
        motivo: "Feriado",
      },
    ],
  },
];

export default function FolgasPage() {
  const navigate = useNavigate();
  const [bloqueando, setBloqueando] = useState(false);
  const [grupos, setGrupos] = useState(GRUPOS);
  // O bloqueio escolhido continua guardado enquanto o modal fecha, para o texto não trocar no meio.
  const [escolhido, setEscolhido] = useState(null);
  const [editando, setEditando] = useState(false);

  const editar = (item) => {
    setEscolhido(item);
    setEditando(true);
  };

  const remover = () => {
    setGrupos((gs) =>
      gs
        .map((g) => ({ ...g, itens: g.itens.filter((i) => i.id !== escolhido.id) }))
        .filter((g) => g.itens.length > 0),
    );
    setEditando(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar"
          onClick={() => navigate("/painel/ajustes")}
        />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">
          Folgas e bloqueios
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 pt-3 pb-4">
        <p className="text-sm leading-[1.45] text-ink-2">
          Os horários bloqueados somem do seu link. Quem já marcou não é afetado.
        </p>

        {grupos.map((g) => (
          <section key={g.id} className="flex flex-col gap-2 leading-[normal]">
            <h2 className="text-[13px] font-medium text-ink-2">{g.titulo}</h2>
            <ListGroup inset>
              {g.itens.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => editar(item)}
                  className="flex pressable items-center gap-3 py-[13px] pr-3.5 pl-4 text-left active:scale-100 active:bg-paper"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span
                      className={cn(
                        "truncate text-[15px] font-semibold tracking-[-0.15px]",
                        g.passado ? "text-ink-2" : "text-ink",
                      )}
                    >
                      {item.dia}
                    </span>
                    <span className="truncate text-[13px] text-ink-2">{item.detalhe}</span>
                  </span>
                  <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
                </button>
              ))}
            </ListGroup>
          </section>
        ))}

        <DashedButton icon={maisIcon} onClick={() => setBloqueando(true)}>
          Bloquear horário
        </DashedButton>
      </main>

      <BloquearHorarioSheet open={bloqueando} onClose={() => setBloqueando(false)} />
      {escolhido && (
        <BloquearHorarioSheet
          key={escolhido.id}
          open={editando}
          bloqueio={escolhido}
          onClose={() => setEditando(false)}
          onRemover={remover}
        />
      )}
    </div>
  );
}
