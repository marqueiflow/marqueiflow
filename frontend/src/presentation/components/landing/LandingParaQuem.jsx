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
    <LandingSecao id="para-quem" titulo="Para quem atende com hora marcada" className="lg:gap-6">
      <ul className="flex flex-wrap gap-2 lg:gap-2.5">
        {PROFISSOES.map((p) => (
          <li
            key={p}
            className="rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-semibold text-ink lg:px-4.5 lg:py-3 lg:text-[15px]"
          >
            {p}
          </li>
        ))}
      </ul>
    </LandingSecao>
  );
}
