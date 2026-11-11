// AJ-02 — Ajustes › Serviços (só a tela; dados de exemplo do Figma)
// A alça à esquerda arrasta o serviço para mudar a ordem (dedo ou mouse); no teclado, setas ↑ ↓.
// A nova ordem fica só na tela até existir back-end.
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { DashedButton } from "@/presentation/components/ui/DashedButton";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import maisIcon from "@/presentation/assets/icons/mais.svg";
import arrastarIcon from "@/presentation/assets/icons/arrastar-20.svg";
import ocultoIcon from "@/presentation/assets/icons/oculto-18.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

// Exemplo até existir back-end.
const SERVICOS = [
  { id: "1", nome: "Corte", detalhe: "30 min · R$ 40" },
  { id: "2", nome: "Corte + barba", detalhe: "50 min · R$ 60 · sinal 30%" },
  { id: "3", nome: "Barba", detalhe: "20 min · R$ 25" },
  { id: "4", nome: "Sobrancelha na navalha", detalhe: "20 min · R$ 25 · sinal 30%" },
  { id: "5", nome: "Pigmentação", detalhe: "40 min · R$ 50 · oculto", oculto: true },
];

export default function ServicosPage() {
  const navigate = useNavigate();
  const [lista, setLista] = useState(SERVICOS);
  const [arrastando, setArrastando] = useState(null);
  const [aviso, setAviso] = useState("");
  const linhas = useRef(new Map());

  const mover = (id, para) => {
    const de = lista.findIndex((s) => s.id === id);
    if (para < 0 || para >= lista.length || para === de) return;
    const nova = [...lista];
    const [item] = nova.splice(de, 1);
    nova.splice(para, 0, item);
    setLista(nova);
    setAviso(`${item.nome}: posição ${para + 1} de ${lista.length}.`);
  };

  // Posição de destino = quantos outros serviços têm o meio acima do dedo.
  const arrastar = (e) => {
    if (!arrastando) return;
    const para = lista.filter((s) => {
      if (s.id === arrastando) return false;
      const caixa = linhas.current.get(s.id)?.getBoundingClientRect();
      return caixa && caixa.top + caixa.height / 2 < e.clientY;
    }).length;
    mover(arrastando, para);
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
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">Serviços</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 pt-3 pb-4">
        <p className="text-sm leading-[1.45] text-ink-2">
          Arraste para mudar a ordem na sua página. Toque para editar.
        </p>

        <ListGroup dividerClassName="pl-[42px]" className="leading-[normal]">
          {lista.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                if (el) linhas.current.set(s.id, el);
                else linhas.current.delete(s.id);
              }}
              className={cn(
                "flex items-center transition-colors",
                arrastando === s.id && "bg-paper",
              )}
            >
              <button
                type="button"
                aria-label={`Mudar a ordem de ${s.nome}, posição ${i + 1} de ${lista.length}`}
                aria-describedby="ordem-dica"
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setArrastando(s.id);
                }}
                onPointerMove={arrastar}
                onPointerUp={() => setArrastando(null)}
                onPointerCancel={() => setArrastando(null)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                    mover(s.id, i + (e.key === "ArrowUp" ? -1 : 1));
                  }
                }}
                className={cn(
                  "flex h-11 w-[30px] shrink-0 touch-none items-center justify-end outline-none select-none focus-visible:outline-2 focus-visible:outline-ink",
                  arrastando === s.id ? "cursor-grabbing" : "cursor-grab",
                )}
              >
                <img src={arrastarIcon} alt="" width={20} height={20} draggable={false} />
              </button>
              <Link
                to={`/painel/ajustes/servicos/${s.id}`}
                className="flex min-w-0 flex-1 pressable items-center gap-3 py-[13px] pr-3.5 pl-3 active:scale-100 active:bg-paper"
              >
                <span
                  className={cn(
                    "flex min-w-0 flex-1 flex-col gap-0.5",
                    s.oculto ? "text-ink-2" : "text-ink",
                  )}
                >
                  <span className="truncate text-[15px] font-semibold tracking-[-0.15px]">
                    {s.nome}
                  </span>
                  <span className="truncate text-[13px] text-ink-2">{s.detalhe}</span>
                </span>
                {s.oculto && (
                  <img
                    src={ocultoIcon}
                    alt="Oculto na sua página"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                )}
                <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
              </Link>
            </div>
          ))}
        </ListGroup>
        <p id="ordem-dica" className="sr-only">
          Use as setas para cima e para baixo para mover.
        </p>
        <p className="sr-only" aria-live="polite">
          {aviso}
        </p>

        <DashedButton icon={maisIcon} onClick={() => navigate("/painel/ajustes/servicos/novo")}>
          Adicionar serviço
        </DashedButton>
      </main>
    </div>
  );
}
