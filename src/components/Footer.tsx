import { Link } from "@tanstack/react-router";
import { Brain, Mail, Phone, MapPin, ArrowUpRight, Heart } from "lucide-react";

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/contact", label: "Contact" },
];

const resourceLinks = [
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/feedback", label: "Feedback" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-secondary/20">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <Brain className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold text-foreground">AI-Solutions</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Empowering businesses with cutting-edge artificial intelligence solutions
              that drive real results.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/60 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary" aria-label="GitHub">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h4>
            <div className="mt-4 flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <div className="mt-4 flex flex-col gap-3">
              <a href="mailto:info@ai-solutions.com" className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                info@ai-solutions.com
              </a>
              <a href="tel:+15551234567" className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                +1 (555) 123-4567
              </a>
              <div className="group flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI-Solutions. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              Made with <Heart className="h-3 w-3 fill-primary text-primary" /> by AI-Solutions Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
