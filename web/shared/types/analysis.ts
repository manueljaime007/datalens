export type RevenueByCategory = {
  category: string;
  revenue: number;
};

export type TopProduct = {
  product: string;
  quantity: number;
};

export type Analysis = {
  id: number;
  filename: string;
  total_records: number;
  total_quantity: number;
  total_revenue: string;     
  average_value: string;      
  revenue_by_category: RevenueByCategory[];
  top_products: TopProduct[];
};