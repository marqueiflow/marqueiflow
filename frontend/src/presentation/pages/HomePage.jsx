// LP-01 — Landing page da rota principal (Figma · Landing page, celular e computador).
import { LandingComoFunciona } from "@/presentation/components/landing/LandingComoFunciona";
import { LandingHero } from "@/presentation/components/landing/LandingHero";
import { LandingParaQuem } from "@/presentation/components/landing/LandingParaQuem";
import { LandingPerguntas } from "@/presentation/components/landing/LandingPerguntas";
import { LandingPreco } from "@/presentation/components/landing/LandingPreco";
import { LandingRodape } from "@/presentation/components/landing/LandingRodape";
import { LandingTopo } from "@/presentation/components/landing/LandingTopo";
import { LandingVantagens } from "@/presentation/components/landing/LandingVantagens";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-paper">
      <LandingTopo />
      <main className="flex-1">
        <LandingHero />
        <LandingComoFunciona />
        <LandingVantagens />
        <LandingParaQuem />
        <LandingPreco />
        <LandingPerguntas />
      </main>
      <LandingRodape />
    </div>
  );
}
