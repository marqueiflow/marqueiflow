import { LandingSecao } from "./LandingSecao";

const PASSOS = [
  {
    titulo: "Crie seu link",
    texto:
      "Cadastre serviços, horários e a chave Pix. Sua página fica em marqueiflow.com.br/seunome.",
  },
  {
    titulo: "Mande para os clientes",
    texto: "Na bio do Instagram, no status do WhatsApp ou direto na conversa.",
  },
  {
    titulo: "Eles marcam sozinhos",
    texto: "Só aparecem horários livres. Você recebe o aviso e o lembrete sai sozinho.",
  },
];

/** Como funciona em 3 passos. No celular, um embaixo do outro; no computador, lado a lado. */
export function LandingComoFunciona() {
  return (
    <LandingSecao
      id="como-funciona"
      titulo="Como funciona"
      subtitulo="Três passos e sua agenda já recebe clientes."
    >
      <ol className="landing-passos">
        {PASSOS.map((p, i) => (
          <li key={p.titulo} className="landing-passo">
            <span className="landing-passo-numero">{i + 1}</span>
            <div className="landing-passo-texto">
              <h3 className="landing-passo-titulo">{p.titulo}</h3>
              <p className="landing-passo-descricao">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </LandingSecao>
  );
}
