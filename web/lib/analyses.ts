/**
 * MOCK. Substituir por leitura do IndexedDB quando o parsing do CSV estiver ligado.
 * O histórico usa `analyses` (resumo) e a página /analysis/[id] usa `getAnalysis(id)` (detalhe).
 */

export type AnalysisSummary = {
  id: string;
  file: string;
  size: string;
  rows: number;
  date: string;
  ago: string;
  daysAgo: number;
  revenue: number;
  margin: string;
  status: "Concluído";
};

export type AnalysisDetail = AnalysisSummary & {
  encoding: string;
  analysedAt: string;
  units: number;
  skus: number;
  ingestSeconds: string;
  categories: { name: string; revenue: number }[];
  products: { name: string; qty: number; revenue: number }[];
};

export const analyses: AnalysisSummary[] = [
  {
    id: "q3",
    file: "vendas_angola_2024_q3.csv",
    size: "2.4 MB",
    rows: 14820,
    date: "24 Out 2024, 14:32",
    ago: "Há 2 dias",
    daysAgo: 2,
    revenue: 42850600,
    margin: "31.4%",
    status: "Concluído",
  },
  {
    id: "set",
    file: "relatorio_luanda_setembro.csv",
    size: "1.8 MB",
    rows: 9450,
    date: "18 Out 2024, 10:15",
    ago: "Há 8 dias",
    daysAgo: 8,
    revenue: 28120400,
    margin: "28.2%",
    status: "Concluído",
  },
  {
    id: "ben",
    file: "transacoes_loja_benguela.csv",
    size: "850 KB",
    rows: 4120,
    date: "05 Out 2024, 16:45",
    ago: "Há 21 dias",
    daysAgo: 21,
    revenue: 14950000,
    margin: "34.0%",
    status: "Concluído",
  },
  {
    id: "ago",
    file: "vendas_geral_agosto_2024.csv",
    size: "3.1 MB",
    rows: 18200,
    date: "28 Set 2024, 09:20",
    ago: "Há 28 dias",
    daysAgo: 28,
    revenue: 55300800,
    margin: "36.8%",
    status: "Concluído",
  },
];

/* ------------------------- Detalhe (base = design Q3) ------------------------- */

const BASE_ROWS = 14820;
const BASE_REVENUE = 42850600;
const BASE_UNITS = 86450;

const baseCategories: [string, number][] = [
  ["Equipamentos e Tecnologia", 18420000],
  ["Alimentação e Bebidas", 12150200],
  ["Material de Escritório", 7640400],
  ["Mobiliário e Decoração", 3120000],
  ["Outros", 1520000],
];

const baseProducts: [string, number, number][] = [
  ["Smartphone Galaxy A15 128GB", 1420, 11360000],
  ["Papel A4 Navigator 80g (Caixa)", 1150, 3450000],
  ["Café Ginga Torrado 1kg", 980, 1960000],
  ['Monitor LED 24" Dell Full HD', 620, 8680000],
  ["Cadeira Ergonómica Lisboa", 410, 6150000],
];

const extras: Record<
  string,
  { analysedAt: string; skus: number; ingestSeconds: string }
> = {
  q3: {
    analysedAt: "24 de Outubro de 2024 às 14:32",
    skus: 42,
    ingestSeconds: "0,48",
  },
  set: {
    analysedAt: "18 de Outubro de 2024 às 10:15",
    skus: 36,
    ingestSeconds: "0,31",
  },
  ben: {
    analysedAt: "5 de Outubro de 2024 às 16:45",
    skus: 24,
    ingestSeconds: "0,17",
  },
  ago: {
    analysedAt: "28 de Setembro de 2024 às 09:20",
    skus: 47,
    ingestSeconds: "0,59",
  },
};

export function getAnalysis(id: string): AnalysisDetail | null {
  const s = analyses.find((a) => a.id === id);
  const extra = extras[id];
  if (!s || !extra) return null;

  const revFactor = s.revenue / BASE_REVENUE;
  const rowFactor = s.rows / BASE_ROWS;

  // Escala as categorias e fecha a última para a soma bater certo com a receita total
  const categories = baseCategories.map(([name, revenue]) => ({
    name,
    revenue: Math.round(revenue * revFactor),
  }));
  const head = categories.slice(0, -1).reduce((sum, c) => sum + c.revenue, 0);
  categories[categories.length - 1].revenue = s.revenue - head;

  return {
    ...s,
    encoding: "CSV UTF-8",
    analysedAt: extra.analysedAt,
    skus: extra.skus,
    ingestSeconds: extra.ingestSeconds,
    units: Math.round(BASE_UNITS * rowFactor),
    categories,
    products: baseProducts.map(([name, qty, revenue]) => ({
      name,
      qty: Math.round(qty * rowFactor),
      revenue: Math.round(revenue * revFactor),
    })),
  };
}
