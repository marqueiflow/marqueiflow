// PUB-04 — Link não encontrado (Figma 14). Também é a página de qualquer endereço que não existe.
import { Link } from "react-router";
import { LinksLegais } from "@/presentation/components/legal/LinksLegais";
import { Logo } from "@/presentation/components/ui/Logo";
import buscaIcon from "@/presentation/assets/icons/busca-28.svg";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className="flex flex-1 flex-col gap-6 px-5 pt-7 pb-4 leading-[normal]">
        <Logo className="text-[22px]" />

        <section className="mt-20 flex flex-col items-start gap-3">
          <span className="flex size-16 items-center justify-center rounded-full bg-line">
            <img src={buscaIcon} alt="" width={28} height={28} />
          </span>
          <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.9px] text-ink">
            Não achamos essa agenda.
          </h1>
          <p className="text-[15px] leading-[1.45] text-ink-2">
            O link pode estar com algum erro ou o profissional mudou o endereço. Confira com quem te
            mandou.
          </p>
        </section>

        <Link
          to="/meus-horarios"
          className="inline-flex h-13 pressable items-center justify-center rounded-[14px] border border-line bg-surface px-6 text-base font-semibold tracking-[-0.16px] text-ink"
        >
          Ver meus horários
        </Link>
      </main>

      <footer className="flex flex-col items-center gap-2.5 px-5 pt-3 pb-8.5 leading-[normal]">
        <Link
          to="/criar-conta"
          className="flex w-full pressable flex-col items-center gap-1 rounded-2xl border border-line bg-surface px-4 py-3.5 text-center"
        >
          <span className="text-sm font-semibold text-ink">Você atende clientes?</span>
          <span className="text-[13px] text-ink-2">
            Crie sua agenda grátis com{" "}
            <Logo as="span" className="text-[13px] leading-[normal] tracking-[-0.03em]" />
          </span>
        </Link>
        <LinksLegais />
      </footer>
    </div>
  );
}
