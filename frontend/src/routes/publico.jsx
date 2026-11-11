// Rotas do cliente: página do profissional, agendamento e "meus horários".
// Ficam no fim da lista porque "/:slug" pega qualquer caminho de um nível.
import {
  AgendamentoProntoPage,
  CanceladoPage,
  EscolherHorarioPage,
  MeusHorariosPage,
  ProfissionalPage,
  RemarcadoPage,
  RemarcarPage,
  SeuAgendamentoPage,
  SeusDadosPage,
} from "@/presentation/pages/publico";

export const publicoRoutes = [
  { path: "/meus-horarios", element: <MeusHorariosPage /> }, // CLI-01
  { path: "/a/:token", element: <SeuAgendamentoPage /> }, // CLI-02
  { path: "/a/:token/remarcar", element: <RemarcarPage /> }, // CLI-03
  { path: "/a/:token/remarcado", element: <RemarcadoPage /> }, // CLI-03
  { path: "/a/:token/cancelado", element: <CanceladoPage /> }, // CLI-04
  { path: "/:slug", element: <ProfissionalPage /> }, // PUB-01
  { path: "/:slug/agendar", element: <EscolherHorarioPage /> }, // BOOK-01
  { path: "/:slug/agendar/dados", element: <SeusDadosPage /> }, // BOOK-03
  { path: "/:slug/agendar/pronto", element: <AgendamentoProntoPage /> }, // BOOK-05/06
];
