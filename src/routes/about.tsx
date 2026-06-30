import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Users, Award, Rocket, Lightbulb, Shield, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AI-Solutions" },
      { name: "description", content: "Learn about AI-Solutions, our mission, vision, and the team behind our AI innovations." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Innovation", desc: "Pushing boundaries with cutting-edge AI research", color: "from-blue-500/20 to-cyan-500/20" },
  { icon: Eye, title: "Transparency", desc: "Clear communication and explainable AI models", color: "from-purple-500/20 to-pink-500/20" },
  { icon: Users, title: "Collaboration", desc: "Working closely with clients as true partners", color: "from-green-500/20 to-emerald-500/20" },
  { icon: Award, title: "Excellence", desc: "Delivering results that exceed expectations", color: "from-orange-500/20 to-yellow-500/20" },
];

const team = [
  { name: "Dr. Alex Turner", role: "CEO & Founder", bio: "15+ years in AI research with expertise in deep learning.", icon: Rocket },
  { name: "Lisa Wang", role: "CTO", bio: "Former ML lead at a Fortune 500 tech company.", icon: Lightbulb },
  { name: "Omar Hassan", role: "Head of Engineering", bio: "Specialist in scalable AI infrastructure.", icon: Shield },
  { name: "Emma Davis", role: "VP of Client Success", bio: "Ensures every client achieves measurable ROI.", icon: TrendingUp },
];

const milestones = [
  { year: "2018", event: "Founded with a vision to democratize AI" },
  { year: "2020", event: "Reached 50+ enterprise clients globally" },
  { year: "2022", event: "Launched proprietary ML platform" },
  { year: "2024", event: "150+ successful AI projects delivered" },
];

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <span>Est. 2018</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            About <span className="glow-text">AI-Solutions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We're a team of AI researchers, engineers, and strategists
            dedicated to making artificial intelligence accessible and impactful for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Our <span className="glow-text">Mission</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                To bridge the gap between cutting-edge AI research and practical business applications.
                We believe every organization deserves access to intelligent solutions that drive growth.
              </p>
              <div className="mt-8 space-y-4">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {m.year}
                    </div>
                    <p className="text-sm text-muted-foreground pt-0.5">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold glow-text">150+</div>
                    <div className="mt-1 text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold glow-text">50+</div>
                    <div className="mt-1 text-sm text-muted-foreground">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold glow-text">6+</div>
                    <div className="mt-1 text-sm text-muted-foreground">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold glow-text">98%</div>
                    <div className="mt-1 text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gradient py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Our <span className="glow-text">Values</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="group glass-card card-glow rounded-2xl p-8 text-center transition-all">
                <div className={`mx-auto inline-flex rounded-xl bg-gradient-to-br ${v.color} p-4`}>
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Our <span className="glow-text">Team</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
              Meet the experts behind our AI innovations.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="group glass-card rounded-2xl p-8 text-center transition-all">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 transition-transform group-hover:scale-110">
                  <t.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-5 font-semibold text-lg">{t.name}</h3>
                <p className="text-sm font-medium text-primary">{t.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
