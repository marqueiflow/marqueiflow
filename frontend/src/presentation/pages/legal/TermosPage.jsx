// LGL-03 — Termos de uso (texto provisório do Figma 16; revisar com jurídico)
import { LegalLayout } from "@/presentation/components/legal/LegalLayout";

const EMAIL = "contato@marqueiflow.com.br";

const SECOES = [
  {
    titulo: "O que é o MarqueiFlow",
    texto:
      "Uma ferramenta para o profissional mostrar seus horários livres e receber agendamentos por um link. O atendimento é prestado pelo profissional, não pelo MarqueiFlow.",
  },
  {
    titulo: "Para quem agenda",
    texto:
      "Informe nome e WhatsApp corretos. Você pode remarcar ou cancelar até 2h antes, pelo link do seu agendamento.",
  },
  {
    titulo: "Para profissionais",
    texto:
      "Mantenha serviços, preços e horários atualizados e atenda os horários confirmados. Você responde pelo atendimento e pelas informações da sua página.",
  },
  {
    titulo: "Sinal via Pix",
    texto:
      "Quando houver sinal, o pagamento vai direto para o profissional. Devoluções são combinadas entre cliente e profissional.",
  },
  {
    titulo: "Uso proibido",
    texto:
      "Não use o MarqueiFlow para mandar spam, se passar por outra pessoa ou oferecer serviços ilegais.",
  },
  {
    titulo: "Mudanças nos termos",
    texto: "Podemos atualizar estes termos. Quando a mudança for importante, avisamos antes.",
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

export default function TermosPage() {
  return (
    <LegalLayout
      titulo="Termos de uso"
      atualizadoEm="9 de novembro de 2026"
      intro="Ao usar o MarqueiFlow, você concorda com estas regras. Elas valem para profissionais e para quem agenda."
      secoes={SECOES}
    />
  );
}
