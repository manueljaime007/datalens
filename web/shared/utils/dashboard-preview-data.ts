import {
  Banknote,
  LucideIcon,
  ShoppingCart,
  Receipt,
  Box,
  Headphones,
  Monitor,
  Keyboard,
  Mouse,
} from "lucide-react";

export const kpis: {
  label: string;
  value: string;
  delta: string;
  note: string;
  icon: LucideIcon;
  check?: boolean;
}[] = [
  {
    label: "Receita Total",
    value: "Kz148.920,50",
    delta: "+18.4%",
    note: "vs mês anterior",
    icon: Banknote,
  },
  {
    label: "Total de Encomendas",
    value: "1.842",
    delta: "+12.1%",
    note: "vs mês anterior",
    icon: ShoppingCart,
  },
  {
    label: "Ticket Médio",
    value: "Kz18.000,85",
    delta: "+5.6%",
    note: "vs mês anterior",
    icon: Receipt,
  },
  {
    label: "Produtos Ativos",
    value: "246",
    delta: "100% categorizados",
    note: "",
    icon: Box,
    check: true,
  },
];

export const months = [
  { m: "Jan", h: 28 },
  { m: "Fev", h: 38 },
  { m: "Mar", h: 46 },
  { m: "Abr", h: 42 },
  { m: "Mai", h: 56 },
  { m: "Jun", h: 62 },
  { m: "Jul", h: 72 },
  { m: "Ago", h: 82 },
  { m: "Set", h: 100 },
];

export const categories = [
  {
    name: "Eletrónicos",
    value: "Kz 63.107.027,63",
    pct: 42,
    bar: "bg-primary",
    badge: true,
  },
  {
    name: "Moda & Vestuário",
    value: "Kz 42.071.351,75",
    pct: 28,
    bar: "bg-foreground",
  },
  {
    name: "Casa & Decoração",
    value: "Kz 27.045.868,98",
    pct: 18,
    bar: "bg-chart-2",
  },
  {
    name: "Outros",
    value: "Kz 18.030.579,32",
    pct: 12,
    bar: "bg-muted-foreground/40",
  },
];

export const products: {
  name: string;
  icon: LucideIcon;
  category: string;
  qty: string;
  price: string;
  total: string;
}[] = [
  {
    name: "Auriculares Wireless Pro X",
    icon: Headphones,
    category: "Eletrónicos",
    qty: "420 un",
    price: "Kz 90.705,50",
    total: "Kz 38.096.311,68",
  },
  {
    name: "Monitor UltraWide 34''",
    icon: Monitor,
    category: "Eletrónicos",
    qty: "185 un",
    price: "Kz 352.127,04",
    total: "Kz 65.143.502,40",
  },
  {
    name: "Teclado Mecânico RGB",
    icon: Keyboard,
    category: "Eletrónicos",
    qty: "310 un",
    price: "Kz 75.672,00",
    total: "Kz 23.458.320,00",
  },
  {
    name: "Rato Ergonómico Master",
    icon: Mouse,
    category: "Eletrónicos",
    qty: "290 un",
    price: "Kz 60.436,70",
    total: "Kz 17.526.644,16",
  },
];
