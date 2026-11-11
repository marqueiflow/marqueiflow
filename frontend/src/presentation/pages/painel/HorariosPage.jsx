// AJ-04 — Ajustes › Horários de atendimento (só a tela; dados de exemplo do Figma)
import { Link, useNavigate } from "react-router";
import { HorariosSemana } from "@/presentation/components/horarios/HorariosSemana";
import { Button } from "@/presentation/components/ui/Button";
import { IconButton } from "@/presentation/components/ui/IconButton";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";
import setaIcon from "@/presentation/assets/icons/seta-direita-16-clara.svg";

export default function HorariosPage() {
  const navigate = useNavigate();
  const voltar = () => navigate("/painel/ajustes");

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton icon={voltarIcon} iconSize={18} label="Voltar" onClick={voltar} />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">
          Horários de atendimento
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 py-4">
        <p className="text-sm leading-[1.45] text-ink-2">
          Só esses horários aparecem no seu link. Quem já marcou não é afetado.
        </p>

        <HorariosSemana />

        <Link
          to="/painel/ajustes/folgas"
          className="flex pressable items-center gap-3 rounded-2xl border border-line bg-surface py-3.5 pr-3.5 pl-4 text-left leading-[normal]"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-semibold tracking-[-0.15px] text-ink">
              Folgas e bloqueios
            </span>
            <span className="truncate text-[13px] text-ink-2">
              1 ativa · ter 24/11, 13:00–15:00
            </span>
          </span>
          <img src={setaIcon} alt="" width={16} height={16} className="shrink-0" />
        </Link>
      </main>

      <footer className="sticky bottom-0 bg-paper px-5 pt-3 pb-8.5">
        <Button className="w-full" onClick={voltar}>
          Salvar alterações
        </Button>
      </footer>
    </div>
  );
}
