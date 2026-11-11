// BOOK-03 — Seus dados (só a tela; dados de exemplo do Figma 03 e 12)
// Com ?estado=erro, mostra o WhatsApp incompleto com a mensagem de erro (Figma 12).
// Com ?estado=reservado, confirmar abre o aviso C3 (alguém pegou o horário antes).
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { HorarioReservadoSheet } from "@/presentation/components/agendamento/HorarioReservadoSheet";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { StepProgress } from "@/presentation/components/ui/StepProgress";
import { TextField } from "@/presentation/components/ui/TextField";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import cadeadoIcon from "@/presentation/assets/icons/cadeado-20.svg";

export default function SeusDadosPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const comErro = params.get("estado") === "erro";
  const [nome, setNome] = useState(comErro ? "Lucas Andrade" : "");
  const [whatsapp, setWhatsapp] = useState(comErro ? "(19) 9 8765-43" : "");
  const horarioTomado = params.get("estado") === "reservado";
  const [avisoReservado, setAvisoReservado] = useState(false);

  const confirmar = (e) => {
    e.preventDefault();
    if (horarioTomado) setAvisoReservado(true);
    else navigate(`/${slug}/agendar/pronto`);
  };

  return (
    <form
      onSubmit={confirmar}
      noValidate
      className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3"
    >
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar"
          onClick={() => navigate(`/${slug}/agendar`)}
          className="rounded-2xl"
        />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">Seus dados</h1>
      </header>
      <StepProgress current={2} total={3} className="px-5 py-1" />

      <main className="flex flex-1 flex-col gap-5 px-5 pt-3 pb-4 leading-[normal]">
        <section className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-4.5">
          <h2 className="text-[17px] font-semibold tracking-[-0.17px] text-ink">Corte + barba</h2>
          <p className="text-sm text-ink-2">Segunda, 9 de novembro · 17:00 às 17:50</p>
          <p className="text-sm text-ink-2">Rafa Barber · R$ 60</p>
        </section>

        <TextField
          label="Seu nome"
          placeholder="Lucas Andrade"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="WhatsApp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(19) 9 0000-0000"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          hint={
            comErro
              ? "Faltam números. Confira: (DDD) 9 0000-0000"
              : "Você recebe a confirmação e o lembrete por aqui."
          }
          hintTone={comErro ? "erro" : "neutro"}
        />

        <section className="flex items-start gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5">
          <img src={cadeadoIcon} alt="" width={20} height={20} className="shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-sm font-semibold text-ink">Sem cadastro, sem senha</p>
            <p className="text-[13px] leading-[1.4] text-ink-2">
              Na próxima vez seus dados já aparecem preenchidos neste celular.
            </p>
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 flex flex-col items-center gap-3 bg-paper px-5 pt-3 pb-7 leading-[normal]">
        <p className="text-[13px] text-ink-2">Você pode cancelar ou remarcar até 2h antes.</p>
        <Button type="submit" className="w-full">
          Confirmar agendamento
        </Button>
        <p className="max-w-[290px] text-center text-xs leading-[1.45] text-ink-2">
          Ao confirmar, você concorda com os{" "}
          <Link to="/termos" className="font-medium text-ink underline">
            Termos de uso
          </Link>{" "}
          e a{" "}
          <Link to="/privacidade" className="font-medium text-ink underline">
            Política de privacidade
          </Link>
          .
        </p>
      </footer>

      <HorarioReservadoSheet
        open={avisoReservado}
        onClose={() => setAvisoReservado(false)}
        onFicar={() => navigate(`/${slug}/agendar/pronto`)}
        onOutrosDias={() => navigate(`/${slug}/agendar`)}
      />
    </form>
  );
}
