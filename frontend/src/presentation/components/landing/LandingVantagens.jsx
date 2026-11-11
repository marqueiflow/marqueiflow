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
      <ul className="landing-vantagens">
        {VANTAGENS.map((v, i) => (
          <li key={v.titulo} className="landing-vantagem">
            {i > 0 && <span aria-hidden="true" className="landing-vantagem-divisoria" />}
            <span className="landing-vantagem-icone">
              <img
                src={v.icone}
                alt=""
                width={18}
                height={18}
                className="landing-vantagem-icone-img"
              />
            </span>
            <div className="landing-vantagem-texto">
              <h3 className="landing-vantagem-titulo">{v.titulo}</h3>
              <p className="landing-vantagem-descricao">{v.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </LandingSecao>
  );
}
