import { useState } from "react";
import { Star, Send, CheckCircle, MessageSquare } from "lucide-react";
import { submitFeedback } from "@/lib/feedback.functions";

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    try {
      await submitFeedback({
        data: {
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          rating: rating,
          feedback: fd.get("feedback") as string,
        },
      });
      setSubmitted(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to submit feedback. Please try again.";
      console.error("Feedback error:", err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center animate-fade-in-up">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 animate-pulse-glow">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h3 className="mt-6 text-2xl font-bold">Thank You!</h3>
        <p className="mt-3 text-muted-foreground">
          We appreciate your input and will use it to improve our services.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setRating(5);
            setError("");
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary/60"
        >
          <MessageSquare className="h-4 w-4" />
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-10">
      <div className="mb-8">
        <h3 className="text-2xl font-bold">Share Your Feedback</h3>
        <p className="mt-2 text-sm text-muted-foreground">Help us improve by sharing your experience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="your@email.com"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="mb-3 block text-sm font-semibold">Rating</label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="group rounded-lg p-2 transition-all hover:bg-primary/10"
              >
                <Star
                  className={`h-8 w-8 transition-all ${
                    star <= (hoveredRating || rating)
                      ? "fill-primary text-primary scale-110"
                      : "text-muted-foreground/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Needs Improvement"}
          </p>
        </div>

        {/* Feedback */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Your Feedback</label>
          <textarea
            name="feedback"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            placeholder="Tell us what you think about our services..."
          />
          <p className="mt-2 text-xs text-muted-foreground">Minimum 10 characters</p>
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
              Submitting...
            </span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
}
