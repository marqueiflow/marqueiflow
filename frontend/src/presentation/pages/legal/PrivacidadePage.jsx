// LGL-03 — Política de privacidade (texto provisório do Figma 15; revisar com jurídico)
import { LegalLayout } from "@/presentation/components/legal/LegalLayout";

const EMAIL = "privacidade@marqueiflow.com.br";

const SECOES = [
  {
    titulo: "Quais dados coletamos",
    texto:
      "Se você agenda um horário: nome e WhatsApp. Se você é profissional: nome, e-mail, dados do negócio, serviços, horários e chave Pix.",
  },
  {
    titulo: "Para que usamos",
    texto:
      "Para marcar, confirmar, lembrar e remarcar horários, e para mostrar a página de agendamento do profissional. Não vendemos seus dados.",
  },
  {
    titulo: "Com quem compartilhamos",
    texto:
      "O profissional que você agenda vê seu nome, seu WhatsApp e o horário marcado. Fornecedores de hospedagem e de envio de mensagens tratam os dados só para o serviço funcionar.",
  },
  {
    titulo: "Sinal via Pix",
    texto:
      "O Pix vai direto do cliente para o profissional. O MarqueiFlow não recebe dinheiro nem guarda dados bancários.",
  },
  {
    titulo: "Dados neste celular",
    texto:
      "Seus horários ficam salvos neste aparelho para você não precisar de senha. Para apagar, limpe os dados do navegador.",
  },
  {
    titulo: "Seus direitos (LGPD)",
    texto: "Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento.",
  },
  {
    titulo: "Fale com a gente",
    texto: (
      <a href={`mailto:${EMAIL}`} className="underline-offset-2 hover:underline">
        {EMAIL}
      </a>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <LegalLayout
      titulo="Privacidade"
      atualizadoEm="9 de novembro de 2026"
      intro="O MarqueiFlow conecta profissionais autônomos e seus clientes. Aqui explicamos, sem juridiquês, quais dados usamos e por quê."
      secoes={SECOES}
    />
  );
}
