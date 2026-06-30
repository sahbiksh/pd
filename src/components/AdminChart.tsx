import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Inquiry = {
  id: string;
  created_at: string;
  country?: string | null;
};

function groupByDay(inquiries: Inquiry[], days = 14) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const now = new Date();
  const buckets: Record<string, number> = {};

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * msPerDay);
    const key = d.toISOString().split("T")[0];
    buckets[key] = 0;
  }

  inquiries.forEach((i) => {
    const key = new Date(i.created_at).toISOString().split("T")[0];
    if (key in buckets) buckets[key]++;
  });

  return Object.keys(buckets).map((k) => ({ date: k, count: buckets[k] }));
}

export default function AdminChart({ inquiries }: { inquiries: Inquiry[] }) {
  const data = groupByDay(inquiries, 14).map((d) => ({ ...d, label: d.date.slice(5) }));

  return (
    <div className="glass-card rounded-xl p-4">
      <h4 className="mb-2 text-sm font-medium text-muted-foreground">Inquiries (last 14 days)</h4>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="var(--color-primary, #4f46e5)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
