import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ArrowRight, BookOpen, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getPublicArticles } from "@/lib/content.functions";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — AI-Solutions" },
      { name: "description", content: "Latest articles and insights on AI, machine learning, and digital transformation." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicArticles().then((data) => { setArticles(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <BookOpen className="h-4 w-4" />
            <span>Insights & Articles</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Our <span className="glow-text">Blog</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Insights, trends, and thought leadership in AI, machine learning, and digital transformation.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 animate-shimmer h-72" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="glass-card rounded-2xl py-20 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-primary/40" />
              <p className="mt-4 text-lg text-muted-foreground">No articles published yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Stay tuned for our latest insights.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a, i) => (
                <article
                  key={a.id}
                  className={`group glass-card card-glow flex flex-col rounded-2xl overflow-hidden transition-all animate-fade-in-up stagger-${(i % 3) + 1}`}
                >
                  {/* Gradient header */}
                  <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                        {a.category}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {a.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {a.published_date}
                        </span>
                        {a.read_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {a.read_time}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-1">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
