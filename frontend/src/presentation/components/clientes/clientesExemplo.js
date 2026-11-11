// Clientes de exemplo (Figma · 11 Clientes) até existir back-end.
// Usados na lista (CLT-01) e nos detalhes do cliente (CLT-02).
export const CLIENTES = [
  {
    id: 1,
    iniciais: "LA",
    nome: "Lucas Andrade",
    whatsapp: "(19) 9 8765-4321",
    ultimaVisita: "Hoje, 16:30 · 8 visitas",
    visitas: 8,
    total: "R$ 420",
  },
  {
    id: 2,
    iniciais: "MC",
    nome: "Mateus Costa",
    whatsapp: "(19) 9 8123-4567",
    ultimaVisita: "Há 12 dias · 5 visitas",
    visitas: 5,
    total: "R$ 250",
  },
  {
    id: 3,
    iniciais: "PA",
    nome: "Pedro Alves",
    whatsapp: "(19) 9 9234-5678",
    ultimaVisita: "Há 18 dias · 11 visitas",
    visitas: 11,
    total: "R$ 610",
  },
  {
    id: 4,
    iniciais: "RS",
    nome: "Rafael Santos",
    whatsapp: "(19) 9 9345-6789",
    ultimaVisita: "Há 34 dias · 3 visitas",
    visitas: 3,
    total: "R$ 140",
    sumido: true,
  },
  {
    id: 5,
    iniciais: "GN",
    nome: "Gabriel Nunes",
    whatsapp: "(19) 9 9456-7890",
    ultimaVisita: "Há 41 dias · 6 visitas",
    visitas: 6,
    total: "R$ 300",
    sumido: true,
  },
  {
    id: 6,
    iniciais: "TM",
    nome: "Thiago Moreira",
    whatsapp: "(19) 9 9567-8901",
    ultimaVisita: "Há 3 dias · 1 visita",
    visitas: 1,
    total: "R$ 40",
    novo: true,
  },
];

/** Cliente de exemplo pelo id da rota; undefined se não existir. */
export const acharCliente = (id) => CLIENTES.find((c) => c.id === Number(id));
