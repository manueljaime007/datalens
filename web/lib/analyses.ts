/**
 * Mock data until the Flask API sync lands.
 *
 * TODO(sync): replace with fetch to the Flask API.
 * GET /analyses      -> Analysis[]
 * GET /analyses/:id  -> Analysis
 */

import type { Analysis } from "@/shared/types/analysis";

export const MOCK_ANALYSES: Analysis[] = [
  {
    id: 4,
    filename: "sales.csv",
    total_records: 6,
    total_quantity: 29,
    total_revenue: "811000.00",
    average_value: "135166.67",
    revenue_by_category: [
      { category: "Acessórios", revenue: 171000.0 },
      { category: "Tecnologia", revenue: 640000.0 },
    ],
    top_products: [
      { product: "Auriculares", quantity: 10 },
      { product: "Rato", quantity: 8 },
      { product: "Teclado", quantity: 5 },
      { product: "Telemóvel", quantity: 4 },
      { product: "Monitor", quantity: 2 },
    ],
  },
  /* adicione 1-2 mocks extras se quiser testar /analyses/5, /analyses/6 */
];

export function getAnalysis(id: string | number): Analysis | undefined {
  return MOCK_ANALYSES.find((a) => a.id === Number(id));
}