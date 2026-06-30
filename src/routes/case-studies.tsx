import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, Clock, DollarSign, ArrowRight, BarChart } from "lucide-react";
import { useState, useEffect } from "react";
import { getPublicCaseStudies } from "@/lib/content.functions";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — AI-Solutions" },
      { name: "description", content: "See how AI-Solutions has helped businesses achieve remarkable results." },
    ],
  }),
  component: CaseStudiesPage,
});

const resultIcons: Record<string, LucideIcon> = { TrendingUp, Clock, DollarSign };

function CaseStudiesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicCaseStudies().then((data) => { setCases(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <BarChart className="h-4 w-4" />
            <span>Real Results</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Case <span className="glow-text">Studies</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Real-world results from our AI implementations.
          </p>
        </div>
      </section>

      {/* Cases */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl space-y-10 px-4">
          {loading ? (
            <div className="space-y-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-10 animate-shimmer h-80" />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="glass-card rounded-2xl py-20 text-center">
              <BarChart className="mx-auto h-12 w-12 text-primary/40" />
              <p className="mt-4 text-lg text-muted-foreground">No case studies published yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for our success stories.</p>
            </div>
          ) : (
            cases.map((c, i) => (
              <div key={c.id} className={`group glass-card card-glow rounded-2xl p-10 transition-all animate-fade-in-up stagger-${(i % 3) + 1}`}>
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                    {c.industry}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {c.client_name}
                  </span>
                </div>

                <h3 className="text-2xl font-bold sm:text-3xl group-hover:text-primary transition-colors">{c.title}</h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h4 className="font-semibold text-primary mb-2">Challenge</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.challenge}</p>
                  </div>
                  <div className="rounded-xl bg-secondary/30 p-6">
                    <h4 className="font-semibold text-primary mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.solution}</p>
                  </div>
                </div>

                {Array.isArray(c.results) && c.results.length > 0 && (
                  <div className="mt-8 grid gap-5 sm:grid-cols-3">
                    {c.results.map((r: any, idx: number) => {
                      const Icon = resultIcons[r.icon] || TrendingUp;
                      return (
                        <div key={idx} className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center border border-primary/10">
                          <Icon className="mx-auto h-7 w-7 text-primary" />
                          <div className="mt-3 text-2xl font-bold glow-text">{r.value}</div>
                          <div className="mt-1 text-sm text-muted-foreground">{r.label}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
