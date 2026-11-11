// AJ-03 / ONB-02 — Formulário de serviço (Figma: 15 · Adicionar serviço).
// Só a tela; sem regra por enquanto. Usado no cadastro e, depois, em Ajustes › Serviços.
import { useState } from "react";
import { Button } from "@/presentation/components/ui/Button";
import { ChoiceChips } from "@/presentation/components/ui/ChoiceChips";
import { IconButton } from "@/presentation/components/ui/IconButton";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { ListRow } from "@/presentation/components/ui/ListRow";
import { Switch } from "@/presentation/components/ui/Switch";
import { TextField } from "@/presentation/components/ui/TextField";
import voltarIcon from "@/presentation/assets/icons/voltar-18.svg";

const duracoes = [
  { value: 15, label: "15 min" },
  { value: 20, label: "20 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 h" },
  { value: "outro", label: "Outro" },
];
const sinais = [
  { value: 20, label: "20%" },
  { value: 30, label: "30%" },
  { value: 50, label: "50%" },
  { value: "fixo", label: "Valor fixo" },
];
const intervalos = [
  { value: 0, label: "Nenhum" },
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
];

function Secao({ titulo, descricao, children }) {
  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className="text-sm font-semibold text-ink">{titulo}</h2>
      {descricao && <p className="text-[13px] leading-[1.4] text-ink-2">{descricao}</p>}
      {children}
    </section>
  );
}

/**
 * inicial: valores que já vêm preenchidos (ex.: ao editar). { nome, preco }.
 * onExcluir: quando existe, mostra "Excluir serviço" embaixo do botão de salvar.
 */
export function ServicoForm({
  titulo = "Novo serviço",
  submitLabel = "Salvar serviço",
  inicial = {},
  onBack,
  onSave,
  onExcluir,
}) {
  const [nome, setNome] = useState(inicial.nome ?? "");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState(20);
  const [duracaoOutro, setDuracaoOutro] = useState("");
  const [preco, setPreco] = useState(inicial.preco ?? "");
  const [cobrarSinal, setCobrarSinal] = useState(true);
  const [sinal, setSinal] = useState(30);
  const [sinalFixo, setSinalFixo] = useState("");
  const [intervalo, setIntervalo] = useState(5);
  const [visivel, setVisivel] = useState(true);
  const [destaque, setDestaque] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3"
    >
      <header className="flex h-13 items-center gap-3 px-5">
        <IconButton icon={voltarIcon} iconSize={18} label="Voltar" onClick={onBack} />
        <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.17px] text-ink">{titulo}</h1>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-5 pt-3 pb-6">
        <TextField
          label="Nome do serviço"
          placeholder="Sobrancelha na navalha"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Descrição (opcional)"
          placeholder="Ex.: inclui lavagem e finalização"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          hint="Aparece embaixo do nome, na sua página."
        />

        <Secao
          titulo="Duração"
          descricao="A agenda usa esse tempo para mostrar só horários que cabem."
        >
          <ChoiceChips label="Duração" options={duracoes} value={duracao} onChange={setDuracao} />
          {duracao === "outro" && (
            <TextField
              aria-label="Duração em minutos"
              inputMode="numeric"
              placeholder="Ex.: 40"
              value={duracaoOutro}
              onChange={(e) => setDuracaoOutro(e.target.value)}
              suffix={<span className="text-base text-ink-2">min</span>}
            />
          )}
        </Secao>

        <TextField
          label="Preço"
          prefix="R$"
          prefixClassName="mr-1 text-ink"
          inputMode="decimal"
          placeholder="25"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <ListGroup inset>
          <ListRow
            size="md"
            title="Cobrar sinal via Pix"
            description="Segura o horário e reduz faltas."
            trailing={
              <Switch
                label="Cobrar sinal via Pix"
                checked={cobrarSinal}
                onChange={setCobrarSinal}
              />
            }
          />
          {cobrarSinal && (
            <div className="flex flex-col gap-2.5 px-4 pt-3.5 pb-4">
              <h2 className="text-sm font-semibold text-ink">Quanto do valor</h2>
              <ChoiceChips
                label="Quanto do valor"
                options={sinais}
                value={sinal}
                onChange={setSinal}
              />
              {sinal === "fixo" && (
                <TextField
                  aria-label="Valor do sinal"
                  prefix="R$"
                  prefixClassName="mr-1 text-ink"
                  inputMode="decimal"
                  placeholder="10"
                  value={sinalFixo}
                  onChange={(e) => setSinalFixo(e.target.value)}
                />
              )}
              {/* Texto de exemplo do Figma; o valor real vem quando houver regra. */}
              <p className="rounded-xl bg-accent-soft px-3 py-2.5 text-[13px] leading-[1.4] text-ink-2">
                O cliente paga <strong className="font-semibold text-ink">R$ 7,50</strong> ao
                agendar e o resto no dia.
              </p>
            </div>
          )}
        </ListGroup>

        <Secao
          titulo="Intervalo depois do atendimento"
          descricao="Tempo para limpar e organizar antes do próximo cliente."
        >
          <ChoiceChips
            label="Intervalo depois do atendimento"
            options={intervalos}
            value={intervalo}
            onChange={setIntervalo}
          />
        </Secao>

        <ListGroup inset>
          <ListRow
            size="md"
            title="Mostrar na minha página"
            description="Desligado, só você consegue marcar este serviço."
            trailing={
              <Switch label="Mostrar na minha página" checked={visivel} onChange={setVisivel} />
            }
          />
          <ListRow
            size="md"
            title="Destacar como “mais pedido”"
            trailing={
              <Switch label="Destacar como mais pedido" checked={destaque} onChange={setDestaque} />
            }
          />
        </ListGroup>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-sm font-semibold text-ink">Assim o cliente vê</h2>
          <ListGroup>
            <ListRow
              rowClassName="py-4.5"
              title={nome || "Sobrancelha na navalha"}
              description="20 min · sinal de R$ 7,50"
              trailing={preco ? `R$ ${preco}` : "R$ 25"}
            />
          </ListGroup>
        </section>
      </main>

      <footer className="sticky bottom-0 flex flex-col items-center gap-1 border-t border-line bg-surface px-5 pt-3 pb-8.5">
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
        {onExcluir && (
          <Button variant="texto" className="text-danger" onClick={onExcluir}>
            Excluir serviço
          </Button>
        )}
      </footer>
    </form>
  );
}
