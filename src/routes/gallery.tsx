import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Camera, Eye } from "lucide-react";
import { getPublicGallery } from "@/lib/content.functions";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — AI-Solutions" },
      { name: "description", content: "Photos from our events, office, and team activities at AI-Solutions." },
    ],
  }),
  component: GalleryPage,
});

const colors = [
  "from-primary/20 to-accent/20",
  "from-accent/20 to-primary/20",
  "from-primary/30 to-secondary/50",
  "from-secondary/50 to-primary/30",
];

function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicGallery().then((data) => { setPhotos(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Camera className="h-4 w-4" />
            <span>Visual Stories</span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Photo <span className="glow-text">Gallery</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Moments from our journey in AI innovation.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl animate-shimmer" />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div className="glass-card rounded-2xl py-20 text-center">
              <Camera className="mx-auto h-12 w-12 text-primary/40" />
              <p className="mt-4 text-lg text-muted-foreground">No photos published yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for our latest photos.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {photos.map((p, i) => (
                <div
                  key={p.id}
                  className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${colors[i % colors.length]} transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl font-bold text-primary/30">
                      {p.title.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/40 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="font-bold text-lg">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
