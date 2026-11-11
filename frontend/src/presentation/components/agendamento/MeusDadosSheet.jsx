// CLI-02 — Modal C6 · Editar meus dados (só a tela; dados de exemplo do Figma)
import { useState } from "react";
import { BottomSheet } from "@/presentation/components/ui/BottomSheet";
import { Button } from "@/presentation/components/ui/Button";
import { TextField } from "@/presentation/components/ui/TextField";

/**
 * O cliente corrige o nome e o WhatsApp do agendamento.
 * dados: { nome, whatsapp } — começam nos campos. onSalvar(dados): tocou em "Salvar alterações".
 * Para os campos voltarem aos dados salvos a cada abertura, mude a key ao abrir.
 */
export function MeusDadosSheet({ open, onClose, dados, onSalvar }) {
  const [nome, setNome] = useState(dados.nome);
  const [whatsapp, setWhatsapp] = useState(dados.whatsapp);

  const salvar = (e) => {
    e.preventDefault();
    onSalvar({ nome, whatsapp });
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Meus dados"
      description="O Rafa usa esses dados para falar com você sobre este horário."
    >
      <form onSubmit={salvar} noValidate className="flex flex-col gap-4.5">
        <TextField
          label="Seu nome"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="WhatsApp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <div className="flex flex-col items-center gap-1">
          <Button type="submit" className="w-full">
            Salvar alterações
          </Button>
          {/* TODO(CLI-02): apagar os dados guardados no aparelho quando eles existirem. */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 pressable items-center text-sm font-medium text-ink-2 underline"
          >
            Apagar meus dados deste celular
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
