// Semanas e dias de exemplo (Figma · Semana) até existir back-end.
// Usados na Semana (AG-03) e na tela de um dia (AG-04).

const NOMES = {
  seg: "Segunda",
  ter: "Terça",
  qua: "Quarta",
  qui: "Quinta",
  sex: "Sexta",
  sab: "Sábado",
  dom: "Domingo",
};

const semana = (periodo, resumo, dias) => ({
  periodo,
  resumo,
  dias: dias.map((d) => ({ ...d, nome: NOMES[d.id] })),
});

export const HOJE = 9;

export const SEMANAS = [
  semana("2 a 8 de novembro", "38 atendimentos · R$ 2.120 faturados", [
    { id: "seg", semana: "Seg", dia: 2, ocupados: 8, total: 18 },
    { id: "ter", semana: "Ter", dia: 3, ocupados: 6, total: 18 },
    { id: "qua", semana: "Qua", dia: 4, ocupados: 5, total: 18 },
    { id: "qui", semana: "Qui", dia: 5, ocupados: 7, total: 18 },
    { id: "sex", semana: "Sex", dia: 6, ocupados: 10, total: 20 },
    { id: "sab", semana: "Sáb", dia: 7, ocupados: 16, total: 16, aviso: "Lotado" },
    { id: "dom", semana: "Dom", dia: 8, fechado: true },
  ]),
  semana("9 a 15 de novembro", "34 atendimentos · R$ 1.940 previstos", [
    { id: "seg", semana: "Seg", dia: 9, ocupados: 6, total: 18, hoje: true },
    { id: "ter", semana: "Ter", dia: 10, ocupados: 5, total: 18 },
    { id: "qua", semana: "Qua", dia: 11, ocupados: 4, total: 18 },
    { id: "qui", semana: "Qui", dia: 12, ocupados: 7, total: 18 },
    { id: "sex", semana: "Sex", dia: 13, ocupados: 9, total: 20 },
    { id: "sab", semana: "Sáb", dia: 14, ocupados: 15, total: 16, aviso: "Quase lotado" },
    { id: "dom", semana: "Dom", dia: 15, fechado: true },
  ]),
  semana("16 a 22 de novembro", "12 atendimentos · R$ 690 previstos", [
    { id: "seg", semana: "Seg", dia: 16, ocupados: 2, total: 18 },
    { id: "ter", semana: "Ter", dia: 17, ocupados: 1, total: 18 },
    { id: "qua", semana: "Qua", dia: 18, ocupados: 3, total: 18 },
    { id: "qui", semana: "Qui", dia: 19, ocupados: 1, total: 18 },
    { id: "sex", semana: "Sex", dia: 20, ocupados: 2, total: 20 },
    { id: "sab", semana: "Sáb", dia: 21, ocupados: 3, total: 16 },
    { id: "dom", semana: "Dom", dia: 22, fechado: true },
  ]),
];

/** Dia de exemplo pelo número (2 a 22 de novembro); undefined se não existir. */
export const acharDia = (numero) =>
  SEMANAS.flatMap((s) => s.dias).find((d) => d.dia === Number(numero));

const CLIENTES = [
  "Lucas Andrade",
  "Marcos Lima",
  "Pedro Alves",
  "João Souza",
  "Rafael Costa",
  "Bruno Teixeira",
  "Diego Martins",
  "Felipe Rocha",
];

const SERVICOS = [
  { nome: "Corte · 30 min", valor: "R$ 40", sinal: "R$ 12" },
  { nome: "Corte + barba · 50 min", valor: "R$ 60", sinal: "R$ 18" },
  { nome: "Barba · 20 min", valor: "R$ 25" },
];

const hora = (i) => {
  const minutos = 9 * 60 + i * 30;
  return `${String(Math.floor(minutos / 60)).padStart(2, "0")}:${minutos % 60 ? "30" : "00"}`;
};

// Ocupado ou livre: espalha os "ocupados" entre os horários de um jeito fixo.
// 7 não divide 16, 18 nem 20: cada horário cai num resto diferente, então são exatamente "ocupados".
const ocupado = (d, i) => (i * 7 + d.dia) % d.total < d.ocupados;

/** Primeiro horário livre do dia (para o "+" já vir com ele); undefined se lotado ou fechado. */
export function primeiroLivre(d) {
  if (d.fechado) return undefined;
  for (let i = 0; i < d.total; i += 1) if (!ocupado(d, i)) return hora(i);
  return undefined;
}

/**
 * Atendimentos de exemplo de um dia (horários a cada 30 min, desde 09:00); a tela sempre mostra o
 * mesmo. Formato igual ao de AgendaDoDia.
 */
export function atendimentosDoDia(d) {
  if (d.fechado) return [];
  const passou = d.dia < HOJE;
  const itens = [];
  for (let i = 0; i < d.total; i += 1) {
    if (!ocupado(d, i)) continue;
    const n = itens.length + d.dia;
    const servico = SERVICOS[n % SERVICOS.length];
    const pendente = !passou && servico.sinal && n % 4 === 0;
    const faltou = passou && n % 9 === 0;
    itens.push({
      hora: hora(i),
      cliente: CLIENTES[n % CLIENTES.length],
      servico: servico.nome,
      status: faltou ? "faltou" : pendente ? "aguardando-sinal" : "confirmado",
      detalhes: {
        contato: `(19) 9 8${String(100 + n * 37).slice(-3)}-${String(4000 + n * 113).slice(-4)} · ${(n % 9) + 1}ª visita`,
        horario: `${d.nome}, ${hora(i)}`,
        valor: servico.valor,
        sinal: servico.sinal
          ? `${servico.sinal} · ${pendente ? "não recebido" : "recebido"}`
          : "Sem sinal",
      },
    });
  }
  return itens;
}
