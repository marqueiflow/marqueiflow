import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { cn } from "@/presentation/utils/cn";
import whatsappIcon from "@/presentation/assets/icons/whatsapp-16.svg";
import checkIcon from "@/presentation/assets/icons/check-14.svg";

// Exemplo até existir back-end.
const SLUG = "rafabarber";
const LINK = `https://marqueiflow.com.br/${SLUG}`;

const abrirWhatsApp = () => {
  const texto = `Agende seu horário comigo pelo link: ${LINK}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
};

const copiarLink = async () => {
  try {
    await navigator.clipboard.writeText(LINK);
  } catch {
    // Sem permissão de área de transferência: nada a fazer nesta fase.
  }
};

const PASSOS = [
  { id: "link", titulo: "Criar seu link", feito: true },
  { id: "bio", titulo: "Pôr o link na bio do Instagram", acao: "Copiar link", onClick: copiarLink },
  { id: "status", titulo: "Postar no status do WhatsApp", acao: "Abrir", onClick: abrirWhatsApp },
  // TODO(AG-01): escolher clientes quando houver lista de clientes.
  { id: "antigos", titulo: "Mandar para 5 clientes antigos", acao: "Escolher" },
];

/** Agenda sem nenhum horário (primeiro dia): convite para divulgar o link e primeiros passos. */
export function AgendaVazia() {
  const feitos = PASSOS.filter((p) => p.feito).length;

  return (
    <>
      <section className="flex flex-col gap-3.5 rounded-2xl bg-ink px-4.5 pt-5 pb-4.5">
        <h2 className="text-[22px] leading-[1.2] font-semibold tracking-[-0.44px] text-surface">
          Nenhum horário marcado ainda.
        </h2>
        <p className="text-sm leading-[1.45] text-ink-3">
          Seu link já está no ar. Os primeiros clientes chegam quando você divulga.
        </p>
        <div className="flex items-center gap-2 rounded-full bg-white/8 py-1.5 pr-1.5 pl-3.5">
          <p className="min-w-0 flex-1 truncate text-[13px]">
            <span className="text-ink-3">marqueiflow.com.br/</span>
            <span className="font-semibold text-surface">{SLUG}</span>
          </p>
          <button
            type="button"
            onClick={abrirWhatsApp}
            aria-label="Mandar o link no WhatsApp"
            className="relative flex size-9 shrink-0 pressable items-center justify-center rounded-full bg-accent before:absolute before:-inset-1"
          >
            <img src={whatsappIcon} alt="" width={16} height={16} />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">
            Primeiros passos
          </h2>
          <p className="text-sm font-medium text-ink-2">
            {feitos} de {PASSOS.length}
          </p>
        </div>

        <ListGroup dividerClassName="pl-[50px]">
          {PASSOS.map((passo) => (
            <div key={passo.id} className="flex items-center gap-3 p-3.5">
              {passo.feito ? (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success">
                  <img src={checkIcon} alt="" width={14} height={14} />
                </span>
              ) : (
                <span className="size-6 shrink-0 rounded-full border-[1.5px] border-ink-3" />
              )}
              <p
                className={cn(
                  "min-w-0 flex-1 text-[15px] tracking-[-0.15px]",
                  passo.feito ? "text-ink-2 line-through" : "font-semibold text-ink",
                )}
              >
                {passo.titulo}
                {passo.feito && <span className="sr-only"> (feito)</span>}
              </p>
              {passo.acao && (
                <button
                  type="button"
                  onClick={passo.onClick}
                  className="-my-3.5 flex h-11 shrink-0 pressable items-center text-sm font-semibold text-accent-strong"
                >
                  {passo.acao}
                </button>
              )}
            </div>
          ))}
        </ListGroup>
      </section>
    </>
  );
}
