// AUTH-01 — Criar conta com nome, e-mail e senha ou Google (só a tela; Figma 01d · Criar conta)
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "@/presentation/components/auth/AuthLayout";
import { TextField } from "@/presentation/components/ui/TextField";

export default function CriarContaPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // TODO(AUTH-01): criar a conta quando o back-end existir. Por enquanto segue para o cadastro.
  const criar = () => navigate("/cadastro/1");

  return (
    <AuthLayout
      titulo="Crie sua conta"
      texto="É grátis. Depois você monta sua agenda em 4 passos."
      acao="Criar conta"
      onEnviar={criar}
      onGoogle={criar}
      rodape={{ pergunta: "Já tem conta?", acao: "Entrar", to: "/entrar" }}
      termos="Ao criar a conta, você aceita os"
    >
      <TextField
        label="Seu nome"
        autoComplete="name"
        placeholder="Rafael Barbosa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
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
      <TextField
        label="Senha"
        type="password"
        autoComplete="new-password"
        placeholder="Crie uma senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        hint="Pelo menos 8 caracteres."
      />
    </AuthLayout>
  );
}
