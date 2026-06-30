import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { getPublicEvents } from "@/lib/content.functions";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — AI-Solutions" },
      { name: "description", content: "Upcoming AI events, webinars, and conferences hosted or attended by AI-Solutions." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicEvents().then((data) => { setEvents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Calendar className="h-4 w-4" />
            <span>Upcoming & Past Events</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Upcoming <span className="glow-text">Events</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Join us at our next event and be part of the AI revolution.
          </p>
        </div>
      </section>

      {/* Events */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl space-y-8 px-4">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 animate-shimmer h-48" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="glass-card rounded-2xl py-20 text-center">
              <Calendar className="mx-auto h-12 w-12 text-primary/40" />
              <p className="mt-4 text-lg text-muted-foreground">No upcoming events.</p>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for new events.</p>
            </div>
          ) : (
            events.map((e, i) => (
              <div
                key={e.id}
                className={`group glass-card card-glow rounded-2xl p-8 transition-all animate-fade-in-up stagger-${(i % 3) + 1}`}
              >
                <div className="flex items-start gap-6">
                  {/* Date badge */}
                  <div className="hidden sm:flex flex-col items-center justify-center rounded-xl bg-primary/10 px-5 py-4 min-w-[80px]">
                    <span className="text-2xl font-bold text-primary">
                      {e.event_date ? new Date(e.event_date).getDate() : "--"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {e.event_date ? new Date(e.event_date).toLocaleDateString('en', { month: 'short' }) : ""}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                        {e.event_type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{e.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{e.description}</p>

                    <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {e.event_date}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {e.location}
                      </span>
                      {e.event_time && (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          {e.event_time}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
