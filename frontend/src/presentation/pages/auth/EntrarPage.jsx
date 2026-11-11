// AUTH-03 — Entrar com e-mail e senha ou Google (só a tela; Figma 01 · Entrar — e-mail e senha)
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "@/presentation/components/auth/AuthLayout";
import { TextField } from "@/presentation/components/ui/TextField";

export default function EntrarPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // TODO(AUTH-03): ligar ao login quando o back-end existir. Por enquanto só abre o painel.
  const entrar = () => navigate("/painel");

  return (
    <AuthLayout
      titulo="Entrar na sua agenda"
      texto="Que bom te ver de novo."
      acao="Entrar"
      onEnviar={entrar}
      onGoogle={entrar}
      rodape={{ pergunta: "Não tem conta?", acao: "Criar conta", to: "/criar-conta" }}
      termos="Ao continuar, você aceita os"
    >
      <TextField
        label="E-mail"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="none"
        placeholder="voce@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <TextField
          label="Senha"
          type="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Link
          to="/esqueci-senha"
          className="flex h-11 pressable items-center self-end text-sm font-semibold text-accent-strong"
        >
          Esqueci minha senha
        </Link>
      </div>
    </AuthLayout>
  );
}
