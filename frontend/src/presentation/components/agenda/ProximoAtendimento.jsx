import pontoIcon from "@/presentation/assets/icons/ponto-proximo.svg";
import whatsappIcon from "@/presentation/assets/icons/whatsapp-18.svg";

/** Cartão escuro com o próximo atendimento do dia e as ações rápidas. */
export function ProximoAtendimento({ quando, hora, cliente, detalhe, onLembrete, onDetalhes }) {
  return (
    <section className="flex flex-col gap-3.5 rounded-2xl bg-ink px-4.5 pt-4 pb-4.5 leading-[normal]">
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-1.5 text-[13px] font-medium text-ink-3">
          <img src={pontoIcon} alt="" width={7} height={7} />
          Próximo · {quando}
        </p>
        <h2 className="text-[22px] font-semibold tracking-[-0.44px] text-surface">
          {hora}
          <span className="ml-2.5">{cliente}</span>
        </h2>
        <p className="text-sm text-ink-3">{detalhe}</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onLembrete}
          className="flex h-11 flex-1 pressable items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold tracking-[-0.15px] text-ink"
        >
          <img src={whatsappIcon} alt="" width={18} height={18} />
          Lembrete
        </button>
        <button
          type="button"
          onClick={onDetalhes}
          className="flex h-11 flex-1 pressable items-center justify-center rounded-xl bg-white/10 text-[15px] font-semibold tracking-[-0.15px] text-surface"
        >
          Ver detalhes
        </button>
      </div>
    </section>
  );
}
