import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CheckCircle, Mail, Phone, MapPin, Clock, Globe, MessageSquare } from "lucide-react";
import { submitContactInquiry } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — AI-Solutions" },
      { name: "description", content: "Get in touch with AI-Solutions. Tell us about your project and let's explore how AI can help." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    try {
      await submitContactInquiry({
        data: {
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          phone: (fd.get("phone") as string) || undefined,
          company_name: (fd.get("company_name") as string) || undefined,
          country: (fd.get("country") as string) || undefined,
          job_title: (fd.get("job_title") as string) || undefined,
          job_details: (fd.get("job_details") as string) || undefined,
        },
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 animate-pulse-glow">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Thank You!</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            We've received your inquiry and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/60"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <MessageSquare className="h-4 w-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Contact <span className="glow-text">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Ready to start your AI journey? Tell us about your project and we'll explore how AI can help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have a question or want to discuss a project? Reach out through any of these channels.
              </p>

              <div className="space-y-4 mt-8">
                <a href="mailto:info@ai-solutions.com" className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-muted-foreground">info@ai-solutions.com</div>
                  </div>
                </a>

                <a href="tel:+15551234567" className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </a>

                <div className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                  </div>
                </div>

                <div className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Response Time</div>
                    <div className="text-sm text-muted-foreground">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card space-y-6 rounded-2xl p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Name *</label>
                    <input name="name" required maxLength={100} placeholder="Your full name" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Email *</label>
                    <input name="email" type="email" required maxLength={255} placeholder="you@company.com" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Phone</label>
                    <input name="phone" maxLength={30} placeholder="+1 (555) 000-0000" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Company</label>
                    <input name="company_name" maxLength={200} placeholder="Your company" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Country</label>
                    <input name="country" maxLength={100} placeholder="Your country" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold">Job Title</label>
                    <input name="job_title" maxLength={200} placeholder="Your role" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Project Details</label>
                  <textarea name="job_details" rows={5} maxLength={5000} className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Tell us about your project requirements, goals, and timeline..." />
                </div>
                {error && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all btn-glow hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
