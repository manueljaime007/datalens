"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Analysis } from "@/shared/types/analysis";

const fmtKz = (n: number) =>
  new Intl.NumberFormat("pt-PT", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n) + " Kz";

export function RevenueByAnalysisChart({ analyses }: { analyses: Analysis[] }) {
  const data = analyses.map((a) => ({
    name: a.filename.replace(/\.csv$/i, ""),
    revenue: Number(a.total_revenue),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer
  width="100%"
  height="100%"
  minWidth={0}
  initialDimension={{ width: 1, height: 1 }}
>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => fmtKz(Number(v))}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            formatter={(v: number) => fmtKz(v)}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-primary)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RecordsVsUnitsChart({ analyses }: { analyses: Analysis[] }) {
  const data = analyses.map((a) => ({
    name: a.filename.replace(/\.csv$/i, ""),
    registos: a.total_records,
    unidades: a.total_quantity,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer
  width="100%"
  height="100%"
  minWidth={0}
  initialDimension={{ width: 1, height: 1 }}
>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <Bar
            dataKey="registos"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="unidades"
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
