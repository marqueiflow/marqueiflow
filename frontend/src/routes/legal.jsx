// Rotas das páginas legais.
import { PrivacidadePage, TermosPage } from "@/presentation/pages/legal";

export const legalRoutes = [
  { path: "/privacidade", element: <PrivacidadePage /> }, // LGL-03
  { path: "/termos", element: <TermosPage /> }, // LGL-03
];
