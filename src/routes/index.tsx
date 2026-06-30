import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Zap, Shield, BarChart3, ArrowRight, Star, Sparkles, TrendingUp, Users, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const services = [
  { icon: Brain, title: "Machine Learning", desc: "Custom ML models tailored to your business needs", gradient: "from-blue-500/20 to-purple-500/20" },
  { icon: Zap, title: "Process Automation", desc: "Streamline workflows with intelligent automation", gradient: "from-yellow-500/20 to-orange-500/20" },
  { icon: Shield, title: "AI Security", desc: "Protect your systems with AI-powered threat detection", gradient: "from-green-500/20 to-teal-500/20" },
  { icon: BarChart3, title: "Data Analytics", desc: "Transform raw data into actionable business insights", gradient: "from-pink-500/20 to-rose-500/20" },
];

const stats = [
  { value: "150+", label: "Projects Delivered", icon: TrendingUp },
  { value: "98%", label: "Client Satisfaction", icon: Award },
  { value: "50+", label: "Enterprise Clients", icon: Users },
  { value: "24/7", label: "Support Available", icon: Sparkles },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechCorp", text: "AI-Solutions transformed our data pipeline, reducing processing time by 80%. The team's expertise is unmatched.", rating: 5 },
  { name: "James Miller", role: "VP Engineering, DataFlow", text: "Their ML models exceeded our expectations in accuracy and performance. Truly world-class.", rating: 5 },
  { name: "Maria Rodriguez", role: "CEO, InnovateLab", text: "Exceptional team that truly understands business-driven AI solutions. Highly recommended.", rating: 5 },
];

function HomePage() {
  return (
    <div>
      {/* Hero Section - Enhanced */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" width={1920} height={1080} />
          <div className="absolute inset-0 hero-gradient opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-primary backdrop-blur-sm animate-fade-in-up">
            <Zap className="h-4 w-4 animate-pulse-glow" />
            <span>Powered by Advanced AI</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up stagger-1">
            Intelligent Solutions for{" "}
            <span className="glow-text">Tomorrow's</span> Business
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in-up stagger-2">
            We leverage cutting-edge artificial intelligence to solve complex business
            challenges and drive measurable results.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all btn-glow hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 backdrop-blur-sm px-8 py-4 font-semibold text-foreground transition-all hover:bg-secondary/60 hover:border-border"
            >
              Our Services
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up stagger-4">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Trusted by 50+ enterprises
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              4.9/5 client rating
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="relative border-y border-border/50 bg-secondary/20 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center animate-fade-in-up stagger-${i + 1}`}>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-extrabold glow-text sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview - Enhanced */}
      <section className="section-gradient py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What We <span className="glow-text">Offer</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
              Comprehensive AI solutions designed to transform every aspect of your business.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`group relative glass-card card-glow rounded-2xl p-6 transition-all animate-fade-in-up stagger-${i + 1}`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${s.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                
                <div className="relative">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className="group inline-flex items-center gap-2 text-primary font-medium hover:underline">
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Client <span className="glow-text">Feedback</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
              Hear what our clients say about working with us.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`group glass-card rounded-2xl p-8 transition-all animate-fade-in-up stagger-${i + 1}`}
              >
                {/* Quote mark */}
                <div className="text-5xl font-serif text-primary/30 leading-none">"</div>
                
                {/* Stars */}
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p className="mt-4 text-muted-foreground leading-relaxed">{t.text}</p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background gradient */}
            <div className="absolute inset-0 hero-gradient opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            
            {/* Animated orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-[80px] animate-float" />

            <div className="relative glass-card rounded-3xl p-12 text-center sm:p-16">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to <span className="glow-text">Transform</span> Your Business?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
                Let's discuss how AI can solve your unique challenges and unlock new opportunities.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all btn-glow hover:opacity-90"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-8 py-4 font-semibold text-foreground transition-all hover:bg-secondary/60"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
