// ONB-06 — Link pronto (só a tela; dados de exemplo do Figma)
// O QR é de verdade (aponta para o link); "Baixar QR" salva a imagem e "Pôr na bio" copia o link
// e abre o Instagram.
import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import { Link } from "react-router";
import { Button } from "@/presentation/components/ui/Button";
import { Toast } from "@/presentation/components/ui/Toast";
import checkIcon from "@/presentation/assets/icons/check-26.svg";
import qrIlustrativo from "@/presentation/assets/images/qr-ilustrativo.svg";

// Exemplo até existir back-end.
const SLUG = "rafabarber";
const LINK = `marqueiflow.com.br/${SLUG}`;

export default function CadastroProntoPage() {
  const [copiado, setCopiado] = useState(false);
  const [aviso, setAviso] = useState(null);
  const fecharAviso = useCallback(() => setAviso(null), []);
  // Enquanto o QR de verdade não fica pronto, aparece o desenho ilustrativo.
  const [qr, setQr] = useState(null);

  useEffect(() => {
    let ativo = true;
    QRCode.toDataURL(`https://${LINK}`, {
      width: 660,
      margin: 2,
      color: { dark: "#0e0e0c", light: "#ffffff" },
    })
      .then((url) => ativo && setQr(url))
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, []);

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${LINK}`);
    } catch {
      // Sem permissão de área de transferência: segue só com o aviso visual.
    }
  };

  const copiar = async () => {
    await copiarLink();
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const mandarNoWhatsApp = () => {
    const texto = `Agende seu horário comigo pelo link: https://${LINK}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  };

  // A bio do Instagram se edita no perfil: o link vai copiado e o Instagram abre na edição.
  const porNaBio = async () => {
    await copiarLink();
    setAviso("Link copiado. Cole na bio do Instagram.");
    window.open("https://www.instagram.com/accounts/edit/", "_blank", "noopener");
  };

  const baixarQr = () => {
    if (!qr) return;
    const a = document.createElement("a");
    a.href = qr;
    a.download = `qr-marqueiflow-${SLUG}.png`;
    a.click();
    setAviso("QR baixado.");
  };

  return (
    <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col bg-paper pt-3">
      <main className="flex flex-1 flex-col items-center gap-5 px-5 pt-9 pb-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-success-soft">
          <img src={checkIcon} alt="" width={26} height={26} />
        </div>
        <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.9px] text-ink">
          Seu link está no ar.
        </h1>
        <p className="text-[15px] leading-[1.45] text-ink-2">
          Agora é divulgar. Quem toca no link já vê seus horários livres.
        </p>

        <div className="flex w-full items-center gap-2.5 rounded-full bg-ink py-2 pr-2 pl-4.5">
          <p className="min-w-0 flex-1 truncate text-left text-[15px]">
            <span className="text-ink-3">marqueiflow.com.br/</span>
            <span className="font-semibold text-surface">{SLUG}</span>
          </p>
          <button
            type="button"
            onClick={copiar}
            className="relative flex h-10 shrink-0 pressable items-center rounded-full bg-accent px-3.5 text-sm font-semibold text-ink before:absolute before:inset-x-0 before:-inset-y-0.5"
            aria-live="polite"
          >
            {copiado ? "Copiado" : "Copiar"}
          </button>
        </div>

        <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 pt-4 pb-3.5">
          <img src={qr ?? qrIlustrativo} alt={`QR code do link ${LINK}`} width={132} height={132} />
          <p className="text-[13px] font-medium text-ink-2">Para imprimir e deixar no balcão</p>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-2.5 px-5 pt-3 pb-8.5">
        <Button className="w-full" onClick={mandarNoWhatsApp}>
          Mandar no WhatsApp
        </Button>
        <div className="flex w-full gap-2.5">
          <Button variant="secundario" className="flex-1 px-3" onClick={porNaBio}>
            Pôr na bio
          </Button>
          <Button variant="secundario" className="flex-1 px-3" onClick={baixarQr}>
            Baixar QR
          </Button>
        </div>
        <Link
          to="/painel?estado=vazia"
          className="-my-[13px] flex h-11 pressable items-center px-3 text-[15px] font-semibold text-ink-2"
        >
          Ir para minha agenda
        </Link>
      </footer>

      <Toast aberto={aviso !== null} onFechar={fecharAviso}>
        {aviso}
      </Toast>
    </div>
  );
}
