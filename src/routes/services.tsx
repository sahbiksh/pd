import { createFileRoute } from "@tanstack/react-router";
import { Brain, Zap, Shield, BarChart3, Cpu, Cloud, Database, LineChart, type LucideIcon, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getPublicServices } from "@/lib/content.functions";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI-Solutions" },
      { name: "description", content: "Explore our AI services including machine learning, process automation, analytics, and more." },
    ],
  }),
  component: ServicesPage,
});

const iconMap: Record<string, LucideIcon> = { Brain, Zap, Shield, BarChart3, Cpu, Cloud, Database, LineChart };

function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicServices().then((data) => { setServices(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Our <span className="glow-text">Services</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            End-to-end AI solutions from strategy to deployment.
            We handle every stage of your AI journey.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 animate-shimmer h-64" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="glass-card rounded-2xl py-20 text-center">
              <Brain className="mx-auto h-12 w-12 text-primary/40" />
              <p className="mt-4 text-lg text-muted-foreground">No services published yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for our latest offerings.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => {
                const Icon = iconMap[s.icon] || Brain;
                return (
                  <div key={s.id} className={`group glass-card card-glow rounded-2xl p-8 transition-all animate-fade-in-up stagger-${(i % 4) + 1}`}>
                    <div className="inline-flex rounded-xl bg-primary/10 p-4 transition-transform group-hover:scale-110">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    {Array.isArray(s.features) && s.features.length > 0 && (
                      <ul className="mt-5 space-y-2 border-t border-border/50 pt-5">
                        {s.features.map((f: string) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Need a Custom <span className="glow-text">Solution</span>?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every business is unique. Let us design an AI solution tailored to your specific needs.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all btn-glow hover:opacity-90"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
