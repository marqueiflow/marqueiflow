import cadeadoIcon from "@/presentation/assets/icons/cadeado-20.svg";
import whatsappIcon from "@/presentation/assets/icons/whatsapp-18.svg";
import calendarioIcon from "@/presentation/assets/icons/calendario-18-escuro.svg";
import resumoIcon from "@/presentation/assets/icons/aba-resumo-ativa.svg";
import { LandingSecao } from "./LandingSecao";

const VANTAGENS = [
  {
    icone: cadeadoIcon,
    titulo: "Sinal via Pix",
    texto: "Menos faltas: o horário só fica reservado depois do sinal.",
  },
  {
    icone: whatsappIcon,
    titulo: "Lembrete no WhatsApp",
    texto: "O cliente lembra do horário sem você precisar mandar mensagem.",
  },
  {
    icone: calendarioIcon,
    titulo: "Agenda do dia e da semana",
    texto: "Veja quem vem hoje e onde ainda tem espaço na semana.",
  },
  {
    icone: resumoIcon,
    titulo: "Clientes e resumo do mês",
    texto: "Quem sumiu, quanto entrou e quais dias enchem mais.",
  },
];

/**
 * Vantagens. No celular, uma lista agrupada com divisórias; no computador, 4 cartões em 2 colunas.
 */
export function LandingVantagens() {
  return (
    <LandingSecao id="vantagens" titulo="Feito para o dia a dia de quem atende">
      <ul className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent">
        {VANTAGENS.map((v, i) => (
          <li
            key={v.titulo}
            className="relative flex items-start gap-3.5 p-3.5 lg:gap-4 lg:rounded-2xl lg:border lg:border-line lg:bg-surface lg:p-6"
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 left-16 h-px bg-line lg:hidden"
              />
            )}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-paper lg:size-10">
              <img src={v.icone} alt="" width={18} height={18} className="lg:size-5" />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5 lg:gap-1">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink lg:text-lg">
                {v.titulo}
              </h3>
              <p className="text-[13px] leading-[1.4] text-ink-2 lg:text-[15px] lg:leading-normal">
                {v.texto}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </LandingSecao>
  );
}
