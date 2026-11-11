// CLT-01 — Clientes (só a tela; dados de exemplo do Figma)
// A busca filtra a lista pelo nome (sem ligar para acentos ou maiúsculas) ou pelo WhatsApp.
// O filtro mostra todos, só os sumidos (mais de 30 dias sem vir) ou só os novos; vale junto com a busca.
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { PainelLayout } from "@/presentation/components/painel/PainelLayout";
import { CLIENTES } from "@/presentation/components/clientes/clientesExemplo";
import { ChamarSumidosSheet } from "@/presentation/components/clientes/ChamarSumidosSheet";
import { ListaClientes } from "@/presentation/components/clientes/ListaClientes";
import { SegmentedControl } from "@/presentation/components/ui/SegmentedControl";
import buscaIcon from "@/presentation/assets/icons/busca-18.svg";
import limparIcon from "@/presentation/assets/icons/fechar-16-cinza.svg";

// Exemplo até existir back-end.
const FILTROS = [
  { value: "todos", label: "Todos", count: 128 },
  { value: "sumidos", label: "Sumidos", count: 4 },
  { value: "novos", label: "Novos", count: 9 },
];

// Sem acentos e em minúsculas, para "joao" achar "João".
const simples = (texto) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const numeros = (texto) => texto.replace(/\D/g, "");

// Acha pelo nome ou pelos números do WhatsApp.
const buscar = (clientes, busca) => {
  const termo = simples(busca);
  if (!termo) return clientes;
  const digitos = numeros(busca);
  return clientes.filter(
    (c) => simples(c.nome).includes(termo) || (digitos && numeros(c.whatsapp).includes(digitos)),
  );
};

const FILTRAR = {
  todos: () => true,
  sumidos: (c) => c.sumido,
  novos: (c) => c.novo,
};
const VAZIO = {
  todos: "Nenhum cliente ainda.",
  sumidos: "Nenhum cliente sumido.",
  novos: "Nenhum cliente novo.",
};

export default function ClientesPage() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const campoBusca = useRef(null);
  const [chamando, setChamando] = useState(false);
  const encontrados = buscar(CLIENTES.filter(FILTRAR[filtro]), busca);

  return (
    <PainelLayout aba="clientes" className="gap-4 pt-5">
      <header className="flex items-end justify-between">
        <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.96px] text-ink">
          Clientes
        </h1>
        <p className="text-sm font-medium text-ink-2">128 no total</p>
      </header>

      <label className="flex h-12 items-center gap-2.5 rounded-[14px] border border-line bg-surface px-3.5 focus-within:border-ink">
        <img src={buscaIcon} alt="" width={18} height={18} />
        {/* O X azul do navegador fica escondido; o de limpar é o botão cinza logo depois. */}
        <input
          ref={campoBusca}
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome ou WhatsApp"
          aria-label="Buscar cliente"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-2 [&::-webkit-search-cancel-button]:hidden"
        />
        {busca && (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={() => {
              setBusca("");
              campoBusca.current?.focus();
            }}
            className="relative -mr-1.5 flex size-7 shrink-0 pressable items-center justify-center rounded-full before:absolute before:-inset-2"
          >
            <img src={limparIcon} alt="" width={16} height={16} />
          </button>
        )}
      </label>

      <SegmentedControl
        label="Filtrar clientes"
        options={FILTROS}
        value={filtro}
        onChange={setFiltro}
      />

      <section className="flex items-center gap-3 rounded-2xl bg-accent-soft px-4 py-3.5">
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <p className="text-sm leading-[1.35] font-semibold text-ink">
            4 clientes não voltam há mais de 30 dias
          </p>
          <p className="text-[13px] leading-[normal] text-ink-2">
            Uma mensagem costuma trazer metade de volta.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setChamando(true)}
          className="relative flex h-10 shrink-0 pressable items-center rounded-xl bg-ink px-3.5 text-sm font-semibold tracking-[-0.14px] text-surface before:absolute before:inset-x-0 before:-inset-y-0.5"
        >
          Chamar
        </button>
      </section>

      {encontrados.length > 0 ? (
        <ListaClientes
          clientes={encontrados}
          onAbrir={(c) => navigate(`/painel/clientes/${c.id}`)}
        />
      ) : (
        <p className="rounded-2xl border border-line bg-surface px-4 py-6 text-center text-sm leading-[1.45] text-ink-2">
          {busca.trim() ? `Nenhum cliente encontrado para “${busca.trim()}”.` : VAZIO[filtro]}
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        {(busca.trim() || filtro !== "todos") && `${encontrados.length} clientes na lista`}
      </p>
      <ChamarSumidosSheet
        key={String(chamando)}
        open={chamando}
        onClose={() => setChamando(false)}
      />
    </PainelLayout>
  );
}
