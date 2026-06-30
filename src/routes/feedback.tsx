import { createFileRoute } from "@tanstack/react-router";
import { FeedbackForm } from "@/components/FeedbackForm";
import { MessageSquare, Target, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Send Feedback — AI-Solutions" },
      { name: "description", content: "Share your feedback about AI-Solutions. We'd love to hear from you." },
    ],
  }),
  component: FeedbackPage,
});

const benefits = [
  { icon: Zap, title: "Quick Response", desc: "We review feedback within 48 hours" },
  { icon: Target, title: "Actionable", desc: "Your input drives our improvements" },
  { icon: Shield, title: "Confidential", desc: "Your data is safe with us" },
];

function FeedbackPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <MessageSquare className="h-4 w-4" />
            <span>We Value Your Opinion</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Share Your <span className="glow-text">Feedback</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Your feedback helps us improve and deliver better solutions.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <FeedbackForm />

          {/* Benefits */}
          <div className="mt-20 grid gap-6 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="glass-card rounded-2xl p-8 text-center transition-all">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 font-semibold text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
