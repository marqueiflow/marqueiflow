// CLT-01 — Modal P6 · Chamar clientes sumidos (só a tela; clientes e mensagem de exemplo do Figma)
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { cn } from "@/presentation/utils/cn";

// Exemplo até existir back-end.
const SUMIDOS = [
  { iniciais: "RS", nome: "Rafael" },
  { iniciais: "GN", nome: "Gabriel" },
  { iniciais: "TM", nome: "Thiago" },
  { iniciais: "VC", nome: "Vitor" },
];
const MENSAGEM =
  "Faz um tempinho que você não aparece por aqui. Tenho horários livres esta semana — é só escolher: marqueiflow.com.br/rafabarber";

/**
 * Manda a mesma mensagem para os clientes sumidos, um de cada vez: cada toque no botão abre o
 * WhatsApp com a mensagem para um cliente e passa para o próximo; depois do último, fecha.
 * "Editar mensagem" troca o texto (o "Oi, Nome!" do começo é sempre do cliente da vez).
 * Para recomeçar do primeiro a cada abertura, mude a key ao abrir.
 */
export function ChamarSumidosSheet({ open, onClose }) {
  const [vez, setVez] = useState(0);
  const [texto, setTexto] = useState(MENSAGEM);
  const [editando, setEditando] = useState(false);
  const cliente = SUMIDOS[vez];
  const saudacao = `Oi, ${cliente.nome}!`;

  const enviar = () => {
    const mensagem = `${saudacao} ${texto}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
    if (vez === SUMIDOS.length - 1) onClose();
    else setVez(vez + 1);
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Chamar de volta"
      description={`${SUMIDOS.length} clientes não aparecem há mais de 30 dias. A mensagem abre no WhatsApp, um de cada vez.`}
    >
      <div className="rounded-2xl bg-paper p-3.5">
        <div className="flex flex-col gap-1.5 rounded-[14px] rounded-tl-sm bg-success-soft px-3.5 pt-3 pb-2.5">
          {editando ? (
            <>
              <p className="text-sm leading-[1.45] text-ink-2">{saudacao}</p>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                aria-label="Mensagem para os clientes sumidos"
                autoFocus
                onFocus={(e) => e.target.setSelectionRange(texto.length, texto.length)}
                className="field-sizing-content min-h-[3lh] w-full resize-none bg-transparent text-sm leading-[1.45] text-ink outline-none"
              />
            </>
          ) : (
            <p className="text-sm leading-[1.45] whitespace-pre-line text-ink">
              {saudacao} {texto}
            </p>
          )}
          <p className="self-start text-[11px] leading-[normal] font-medium text-ink-2">16:05</p>
        </div>
      </div>

      <div className="flex items-center gap-2 leading-[normal]">
        <div className="flex" aria-hidden="true">
          {SUMIDOS.map((s, i) => (
            <span
              key={s.iniciais}
              className={cn(
                "-ml-1.5 flex size-8 items-center justify-center rounded-full border-2 border-surface text-[11px] font-semibold first:ml-0",
                i < vez ? "bg-success-soft text-success" : "bg-line text-ink",
              )}
            >
              {s.iniciais}
            </span>
          ))}
        </div>
        <p className="min-w-0 flex-1 text-sm text-ink-2" aria-live="polite">
          {vez === 0
            ? `${SUMIDOS[0].nome}, ${SUMIDOS[1].nome} e mais ${SUMIDOS.length - 2}`
            : `${vez} de ${SUMIDOS.length} chamados`}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Button className="w-full" onClick={enviar}>
          {vez === 0 ? `Começar pelo ${cliente.nome}` : `Continuar com o ${cliente.nome}`}
        </Button>
        <Button variant="texto" className="w-full" onClick={() => setEditando((v) => !v)}>
          {editando ? "Pronto" : "Editar mensagem"}
        </Button>
      </div>
    </BottomSheet>
  );
}
