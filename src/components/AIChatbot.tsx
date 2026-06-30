import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { getKnowledgeResponse } from "./ai-chatbot-data";

type Msg = { role: "user" | "assistant"; content: string };

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
  onError: (e: string) => void;
}) {
  try {
    const lastMessage = messages[messages.length - 1]?.content || "";
    const response = getKnowledgeResponse(lastMessage);
    onDelta(response);
  } catch (error) {
    onError("Something went wrong");
  } finally {
    onDone();
  }
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);

    let acc = "";
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((p) => {
        const last = p[p.length - 1];
        if (last?.role === "assistant") {
          return p.map((m, i) => (i === p.length - 1 ? { ...m, content: acc } : m));
        }
        return [...p, { role: "assistant", content: acc }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setLoading(false),
        onError: (e) => {
          upsert(`⚠️ ${e}`);
          setLoading(false);
        },
      });
    } catch {
      upsert("⚠️ Connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg btn-glow transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
          {/* Pulse indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl animate-fade-in-up"
          style={{ height: "min(580px, calc(100vh - 3rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">AI Assistant</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary/60" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Hello! 👋</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    I'm the AI-Solutions assistant.<br />How can I help you today?
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["Services", "Pricing", "Contact"].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        // Directly trigger send with the selected text
                        const text = q;
                        if (loading) return;
                        const userMsg: Msg = { role: "user", content: text };
                        setMessages((p) => [...p, userMsg]);
                        setLoading(true);
                        let acc = "";
                        const upsert = (chunk: string) => {
                          acc += chunk;
                          setMessages((p) => {
                            const last = p[p.length - 1];
                            if (last?.role === "assistant") {
                              return p.map((m, i) => (i === p.length - 1 ? { ...m, content: acc } : m));
                            }
                            return [...p, { role: "assistant", content: acc }];
                          });
                        };
                        streamChat({
                          messages: [userMsg],
                          onDelta: upsert,
                          onDone: () => { setLoading(false); setInput(""); },
                          onError: (e) => { upsert(`⚠️ ${e}`); setLoading(false); setInput(""); },
                        });
                      }}
                      className="rounded-full border border-border/60 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary/60 text-foreground rounded-bl-md"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:my-1">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
                {m.role === "user" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-border/60 px-4 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-xl border border-border/60 bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
