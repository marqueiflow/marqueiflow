// AUTH — Moldura das telas de entrada (Figma 01 · Entrar — e-mail e senha). A Criar conta usa a mesma.
import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { Logo } from "@/presentation/components/ui/Logo";

/**
 * titulo/texto: cabeçalho. children: os campos. acao: rótulo do botão principal.
 * onEnviar: botão principal; onGoogle: "Continuar com Google" (sem ele, some o botão e o "ou").
 * rodape: { pergunta, acao, to } — ex.: "Não tem conta?" + "Criar conta".
 * termos: frase antes dos links legais (sem ela, somem os links).
 */
export function AuthLayout({ titulo, texto, children, acao, onEnviar, onGoogle, rodape, termos }) {
  const enviar = (e) => {
    e.preventDefault();
    onEnviar();
  };

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3 leading-[normal]"
    >
      <div className="flex flex-1 flex-col gap-5 px-5 pt-7 pb-4">
        <Link
          to="/"
          aria-label="MarqueiFlow, página inicial"
          className="area-toque pressable self-start"
        >
          <Logo as="span" />
        </Link>
        <div className="flex flex-col gap-2 pt-3">
          <h1 className="text-[28px] leading-[1.12] font-semibold tracking-[-0.03em] text-ink">
            {titulo}
          </h1>
          <p className="text-[15px] leading-[1.45] text-ink-2">{texto}</p>
        </div>

        {children}

        <Button type="submit" className="w-full">
          {acao}
        </Button>
        {onGoogle && (
          <>
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-line" />
              <span className="text-[13px] text-ink-2">ou</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <Button variant="secundario" className="w-full" onClick={onGoogle}>
              Continuar com Google
            </Button>
          </>
        )}
      </div>

      <footer className="flex flex-col items-center gap-3 px-5 pt-3 pb-8.5">
        <p className="text-[15px] text-ink-2">
          {rodape.pergunta}{" "}
          <Link to={rodape.to} className="area-toque font-semibold text-accent-strong">
            {rodape.acao}
          </Link>
        </p>
        {termos && (
          <p className="text-center text-xs leading-[1.45] text-ink-2">
            {termos}{" "}
            <Link to="/termos" className="font-medium text-ink underline">
              Termos de uso
            </Link>{" "}
            e a{" "}
            <Link to="/privacidade" className="font-medium text-ink underline">
              Política de privacidade
            </Link>
            .
          </p>
        )}
      </footer>
    </form>
  );
}
