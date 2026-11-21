import {
  BarChart3,
  CheckCircle2,
  History,
  Lock,
  PieChart,
  ScanSearch,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export const features: {
  title: string;
  badge: string;
  text: string;
  icon: LucideIcon;
  footIcon: LucideIcon;
  footLeft: string;
  footRight: string;
  badgeClass: string;
}[] = [
  {
    title: "Análise automática",
    badge: "Instantâneo",
    text: "Obtenha indicadores importantes a partir dos seus ficheiros CSV. O sistema deteta delimitadores, limpa anomalias e gera resumos estatísticos no momento do envio.",
    icon: ScanSearch,
    footIcon: CheckCircle2,
    footLeft: "Deteção automática de colunas",
    footRight: "< 300ms",
    badgeClass: "bg-accent text-accent-foreground",
  },
  {
    title: "Visualização de dados",
    badge: "Gráficos Dinâmicos",
    text: "Explore receitas por categoria através de gráficos claros e intuitivos. Converta folhas de cálculo monótonas em painéis interativos fáceis de partilhar com a sua equipa.",
    icon: PieChart,
    footIcon: BarChart3,
    footLeft: "Linhas temporais e distribuições",
    footRight: "Pronto a exportar",
    badgeClass: "bg-secondary text-muted-foreground",
  },
  {
    title: "Ranking de produtos",
    badge: "Pareto 80/20",
    text: "Identifique os produtos com maior quantidade vendida. Descubra quais as referências que geram maior margem e tome decisões de inventário certeiras.",
    icon: Trophy,
    footIcon: Sparkles,
    footLeft: "Classificação por quantidade e receita",
    footRight: "Top N items",
    badgeClass: "bg-secondary text-muted-foreground",
  },
  {
    title: "Histórico de análises",
    badge: "Guarda localmente",
    text: "Consulte os resultados das suas análises anteriores. Compare o desempenho entre trimestres ou semestres sem necessidade de recarregar ficheiros antigos.",
    icon: History,
    footIcon: Lock,
    footLeft: "Privacidade: zero uploads para servidores",
    footRight: "Offline-ready",
    badgeClass: "bg-success/10 text-success",
  },
];
