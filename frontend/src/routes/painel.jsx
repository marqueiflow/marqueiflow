// Rotas do painel do profissional: agenda, clientes, resumo e ajustes.
import {
  AgendaHojePage,
  AjustesPage,
  ClientePage,
  ClientesPage,
  DiaPage,
  FolgasPage,
  HorariosPage,
  PagamentoPage,
  PlanoPage,
  ResumoPage,
  SemanaPage,
  ServicoPage,
  ServicosPage,
} from "@/presentation/pages/painel";

export const painelRoutes = [
  { path: "/painel", element: <AgendaHojePage /> }, // AG-01
  { path: "/painel/semana", element: <SemanaPage /> }, // AG-03
  { path: "/painel/semana/:dia", element: <DiaPage /> }, // AG-04
  { path: "/painel/clientes", element: <ClientesPage /> }, // CLT-01
  { path: "/painel/clientes/:id", element: <ClientePage /> }, // CLT-02
  { path: "/painel/resumo", element: <ResumoPage /> }, // RES-01
  { path: "/painel/ajustes", element: <AjustesPage /> }, // AJ-01
  { path: "/painel/ajustes/servicos", element: <ServicosPage /> }, // AJ-02
  { path: "/painel/ajustes/servicos/:id", element: <ServicoPage /> }, // AJ-03
  { path: "/painel/ajustes/horarios", element: <HorariosPage /> }, // AJ-04
  { path: "/painel/ajustes/pagamento", element: <PagamentoPage /> }, // AJ-05
  { path: "/painel/ajustes/folgas", element: <FolgasPage /> }, // AJ-06
  { path: "/painel/ajustes/plano", element: <PlanoPage /> }, // AJ-07
];
