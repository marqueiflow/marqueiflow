// ONB-01 — Cadastro 1/4: seu negócio (só a tela; sem regra por enquanto)
import { useState } from "react";
import { useNavigate } from "react-router";
import { PhotoInput } from "@/presentation/components/ui/PhotoInput";
import { TextField } from "@/presentation/components/ui/TextField";
import checkIcon from "@/presentation/assets/icons/check.svg";
import { CadastroLayout } from "./CadastroLayout";

export function SeuNegocioStep() {
  const navigate = useNavigate();
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState("");
  const [link, setLink] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <CadastroLayout
      passo={1}
      title="Como seus clientes te encontram?"
      onSubmit={() => navigate("/cadastro/2")}
    >
      <PhotoInput
        title="Foto ou logo"
        description="Aparece no topo da sua página."
        value={foto}
        onChange={setFoto}
      />
      <TextField
        label="Nome do negócio"
        placeholder="Rafa Barber"
        autoComplete="organization"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        label="Seu link"
        prefix="marqueiflow.com.br/"
        placeholder="rafabarber"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        inputClassName="font-semibold"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        suffix={link ? <img src={checkIcon} alt="" width={18} height={18} /> : undefined}
        hint={link ? "Disponível. Dá para mudar depois." : "Dá para mudar depois."}
        hintTone={link ? "sucesso" : "neutro"}
      />
      <TextField
        label="WhatsApp do negócio"
        type="tel"
        autoComplete="tel-national"
        placeholder="(19) 9 8123-4567"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        hint="Os clientes falam com você por aqui."
      />
      <TextField
        label="Endereço (opcional)"
        autoComplete="street-address"
        placeholder="R. Barão de Jaguara, 1200 · Centro"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
    </CadastroLayout>
  );
}
