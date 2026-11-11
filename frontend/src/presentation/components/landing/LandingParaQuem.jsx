import { LandingSecao } from "./LandingSecao";

const PROFISSOES = [
  "Barbeiros",
  "Cabeleireiras",
  "Manicures",
  "Esteticistas",
  "Personal trainers",
  "Tatuadores",
  "Massoterapeutas",
];

/** Para quem: as profissões em pílulas, quebrando linha quando não cabem. */
export function LandingParaQuem() {
  return (
    <LandingSecao
      id="para-quem"
      titulo="Para quem atende com hora marcada"
      className="landing-para-quem"
    >
      <ul className="landing-profissoes">
        {PROFISSOES.map((p) => (
          <li key={p} className="landing-profissao">
            {p}
          </li>
        ))}
      </ul>
    </LandingSecao>
  );
}
