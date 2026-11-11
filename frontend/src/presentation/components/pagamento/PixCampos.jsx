// ONB-04 / AJ-05 — Campos de Pix e sinal (só a tela). Usado no cadastro (passo 4) e em Ajustes › Pagamento.
import { useState } from "react";
import { ChoiceChips } from "@/presentation/components/ui/ChoiceChips";
import { ListGroup } from "@/presentation/components/ui/ListGroup";
import { ListRow } from "@/presentation/components/ui/ListRow";
import { Switch } from "@/presentation/components/ui/Switch";
import { TextField } from "@/presentation/components/ui/TextField";

const tiposDeChave = [
  { value: "celular", label: "Celular", placeholder: "(19) 9 8123-4567", inputMode: "tel" },
  { value: "email", label: "E-mail", placeholder: "rafabarber@email.com", inputMode: "email" },
  { value: "documento", label: "CPF/CNPJ", placeholder: "000.000.000-00", inputMode: "numeric" },
  { value: "aleatoria", label: "Aleatória", placeholder: "Cole a chave aqui", inputMode: "text" },
];

const sinais = [
  { value: 20, label: "20%" },
  { value: 30, label: "30%" },
  { value: 50, label: "50%" },
];

/** inicial: valores que já vêm preenchidos (ex.: em Ajustes). { chave, nome }. */
export function PixCampos({ inicial = {} }) {
  const [tipo, setTipo] = useState("email");
  const [chave, setChave] = useState(inicial.chave ?? "");
  const [nome, setNome] = useState(inicial.nome ?? "");
  const [cobrarSinal, setCobrarSinal] = useState(true);
  const [sinal, setSinal] = useState(30);

  const tipoAtual = tiposDeChave.find((t) => t.value === tipo);

  return (
    <>
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-ink">Tipo de chave Pix</h2>
        <ChoiceChips
          label="Tipo de chave Pix"
          options={tiposDeChave}
          value={tipo}
          onChange={setTipo}
        />
      </section>

      <TextField
        label="Chave Pix"
        placeholder={tipoAtual.placeholder}
        inputMode={tipoAtual.inputMode}
        autoCapitalize="none"
        value={chave}
        onChange={(e) => setChave(e.target.value)}
      />
      <TextField
        label="Nome de quem recebe"
        placeholder="Rafael Barbosa"
        autoComplete="name"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        hint="O cliente confere esse nome no app do banco."
      />

      <ListGroup inset>
        <ListRow
          size="md"
          title="Cobrar sinal"
          description="Sem pagar em 30 min, o horário volta a ficar livre."
          trailing={
            <Switch
              size="sm"
              label="Cobrar sinal"
              checked={cobrarSinal}
              onChange={setCobrarSinal}
            />
          }
        />
        {cobrarSinal && (
          <div className="px-4 pt-3 pb-3.5">
            <ChoiceChips
              label="Quanto do valor"
              options={sinais}
              value={sinal}
              onChange={setSinal}
            />
          </div>
        )}
      </ListGroup>
    </>
  );
}
