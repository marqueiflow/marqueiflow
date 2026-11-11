// AUTH-04 — Esqueci a senha (só a tela; Figma 01e · Esqueci a senha)
// "Enviar link" troca para o aviso de link enviado; nada é enviado até existir back-end.
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "@/presentation/components/auth/AuthLayout";
import { TextField } from "@/presentation/components/ui/TextField";

const RODAPE = { pergunta: "Lembrou a senha?", acao: "Entrar", to: "/entrar" };

export default function EsqueciSenhaPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <AuthLayout
        titulo="Confira seu e-mail"
        texto={`Se existir uma conta com ${email || "esse e-mail"}, o link para criar uma senha nova chega em alguns minutos.`}
        acao="Voltar para Entrar"
        onEnviar={() => navigate("/entrar")}
        rodape={RODAPE}
      />
    );
  }

  // TODO(AUTH-04): mandar o e-mail de verdade quando o back-end existir.
  return (
    <AuthLayout
      titulo="Esqueceu a senha?"
      texto="Digite seu e-mail e mandamos um link para você criar uma senha nova."
      acao="Enviar link"
      onEnviar={() => setEnviado(true)}
      rodape={RODAPE}
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
    </AuthLayout>
  );
}
