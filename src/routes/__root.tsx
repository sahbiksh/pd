import { Outlet, createRootRoute, HeadContent, Scripts, useRouter } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AIChatbot } from "../components/AIChatbot";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 pt-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative max-w-lg text-center animate-fade-in-up">
        <h1 className="text-8xl font-extrabold glow-text sm:text-9xl">404</h1>
        <h2 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">Page not found</h2>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all btn-glow hover:opacity-90"
          >
            Go Home
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary/60"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI-Solutions — Intelligent Business Solutions" },
      { name: "description", content: "AI-Solutions delivers cutting-edge artificial intelligence solutions to transform your business." },
      { property: "og:title", content: "AI-Solutions — Intelligent Business Solutions" },
      { property: "og:description", content: "AI-Solutions delivers cutting-edge artificial intelligence solutions to transform your business." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const router = useRouter();
  const pathname = router.state.location.pathname ?? "";
  const hideShell = pathname.startsWith("/admin");

  return (
    <>
      {!hideShell && <Navbar />}
      <main className={`min-h-screen ${hideShell ? "" : "pt-16"}`}>
        <Outlet />
      </main>
      {!hideShell && <Footer />}
      {!hideShell && <AIChatbot />}
    </>
  );
}
