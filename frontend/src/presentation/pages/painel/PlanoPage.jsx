// AJ-07 — Ajustes › Plano (só a tela; Figma 13b). Por enquanto existe só o plano Grátis.
import { useNavigate } from "react-router";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import checkIcon from "@/presentation/assets/icons/check-14.svg";

const INCLUIDO = [
  "Seu link de agendamento",
  "Agenda do dia e da semana",
  "Sinal via Pix",
  "Lembretes pelo WhatsApp",
  "Clientes e resumo do mês",
];

export default function PlanoPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton
          icon={voltarIcon}
          iconSize={18}
          label="Voltar"
          onClick={() => navigate("/painel/ajustes")}
        />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">Plano</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 pt-3 pb-4">
        <section className="flex flex-col gap-3.5 rounded-2xl bg-ink px-4.5 pt-5 pb-4.5">
          <h2 className="text-[22px] leading-[1.2] font-semibold tracking-[-0.44px] text-surface">
            Você está no plano Grátis.
          </h2>
          <p className="text-sm leading-[1.45] text-ink-3">
            Sem mensalidade. O sinal do Pix cai direto na sua conta.
          </p>
        </section>

        <section className="flex flex-col gap-2 leading-[normal]">
          <h2 className="text-[13px] font-medium text-ink-2">O que está incluído</h2>
          <ListGroup dividerClassName="pl-[50px]">
            {INCLUIDO.map((item) => (
              <div key={item} className="flex items-center gap-3 p-3.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success">
                  <img src={checkIcon} alt="" width={14} height={14} />
                </span>
                <p className="min-w-0 flex-1 text-[15px] font-medium tracking-[-0.15px] text-ink">
                  {item}
                </p>
              </div>
            ))}
          </ListGroup>
        </section>
      </main>
    </div>
  );
}
