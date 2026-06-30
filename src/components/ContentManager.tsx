import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from "lucide-react";
import { getAdminContent, createContent, updateContent, deleteContent } from "@/lib/content.functions";

type ContentTab = "blog_articles" | "events" | "gallery_photos" | "services" | "case_studies";

const tabLabels: Record<ContentTab, string> = {
  blog_articles: "Blog",
  events: "Events",
  gallery_photos: "Gallery",
  services: "Services",
  case_studies: "Case Studies",
};

const fieldConfig: Record<ContentTab, { key: string; label: string; type: "text" | "textarea" | "boolean" | "number" | "features" | "results" }[]> = {
  blog_articles: [
    { key: "title", label: "Title", type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "published_date", label: "Date", type: "text" },
    { key: "published", label: "Published", type: "boolean" },
  ],
  events: [
    { key: "title", label: "Title", type: "text" },
    { key: "event_type", label: "Type", type: "text" },
    { key: "event_date", label: "Date", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "event_time", label: "Time", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "published", label: "Published", type: "boolean" },
  ],
  gallery_photos: [
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image_url", label: "Image URL", type: "text" },
    { key: "display_order", label: "Order", type: "number" },
    { key: "published", label: "Published", type: "boolean" },
  ],
  services: [
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "icon", label: "Icon Name", type: "text" },
    { key: "features", label: "Features (comma-separated)", type: "features" },
    { key: "display_order", label: "Order", type: "number" },
    { key: "published", label: "Published", type: "boolean" },
  ],
  case_studies: [
    { key: "title", label: "Title", type: "text" },
    { key: "client_name", label: "Client Name", type: "text" },
    { key: "industry", label: "Industry", type: "text" },
    { key: "challenge", label: "Challenge", type: "textarea" },
    { key: "solution", label: "Solution", type: "textarea" },
    { key: "results", label: "Results (JSON)", type: "results" },
    { key: "display_order", label: "Order", type: "number" },
    { key: "published", label: "Published", type: "boolean" },
  ],
};

const displayColumns: Record<ContentTab, string[]> = {
  blog_articles: ["title", "category", "published_date", "published"],
  events: ["title", "event_type", "event_date", "location", "published"],
  gallery_photos: ["title", "display_order", "published"],
  services: ["title", "icon", "display_order", "published"],
  case_studies: ["title", "client_name", "industry", "published"],
};

function getDefaultRecord(tab: ContentTab): Record<string, any> {
  const defaults: Record<string, any> = { published: false };
  for (const f of fieldConfig[tab]) {
    if (!(f.key in defaults)) {
      if (f.type === "number") defaults[f.key] = 0;
      else if (f.type === "boolean") defaults[f.key] = false;
      else if (f.type === "features") defaults[f.key] = [];
      else if (f.type === "results") defaults[f.key] = [];
      else defaults[f.key] = "";
    }
  }
  return defaults;
}

export function ContentManager() {
  const [tab, setTab] = useState<ContentTab>("blog_articles");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async (t: ContentTab) => {
    setLoading(true);
    try {
      const data = await getAdminContent({ data: { table: t } });
      setRows(data as any[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(tab);
  }, [tab]);

  const handleAdd = () => {
    setIsNew(true);
    setEditing(getDefaultRecord(tab));
  };

  const handleEdit = (row: any) => {
    setIsNew(false);
    const rec = { ...row };
    if (tab === "services" && Array.isArray(rec.features)) {
      rec._featuresStr = rec.features.join(", ");
    }
    if (tab === "case_studies" && rec.results) {
      rec._resultsStr = JSON.stringify(rec.results, null, 2);
    }
    setEditing(rec);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const record = { ...editing };
      delete record.id;
      delete record.created_at;
      delete record.updated_at;

      if (tab === "services" && "_featuresStr" in record) {
        record.features = record._featuresStr.split(",").map((s: string) => s.trim()).filter(Boolean);
        delete record._featuresStr;
      }
      if (tab === "case_studies" && "_resultsStr" in record) {
        try { record.results = JSON.parse(record._resultsStr); } catch { /* keep existing */ }
        delete record._resultsStr;
      }

      if (isNew) {
        await createContent({ data: { table: tab, record } });
      } else {
        await updateContent({ data: { table: tab, id: editing.id, record } });
      }
      setEditing(null);
      load(tab);
    } catch (e) {
      console.error(e);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    setDeleting(id);
    try {
      await deleteContent({ data: { table: tab, id } });
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const fields = fieldConfig[tab];
  const cols = displayColumns[tab];

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(tabLabels) as ContentTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setEditing(null); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
          >
            {tabLabels[t]}
          </button>
        ))}
      </div>

      {/* Add button */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">{tabLabels[tab]}</h2>
        <button onClick={handleAdd} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-10 text-center text-muted-foreground">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="glass-card rounded-xl py-10 text-center text-muted-foreground">
          No {tabLabels[tab].toLowerCase()} found. Click "Add New" to create one.
        </div>
      ) : (
        <div className="glass-card overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/30">
                <tr>
                  {cols.map((c) => (
                    <th key={c} className="px-4 py-3 font-medium text-muted-foreground capitalize">{c.replace(/_/g, " ")}</th>
                  ))}
                  <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    {cols.map((c) => (
                      <td key={c} className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                        {c === "published" ? (
                          row[c] ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground/50" />
                        ) : (
                          String(row[c] ?? "—")
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(row)} className="inline-flex items-center gap-1 rounded-md bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground hover:bg-accent/30 transition-colors">
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button onClick={() => handleDelete(row.id)} disabled={deleting === row.id} className="inline-flex items-center gap-1 rounded-md bg-destructive/20 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/30 transition-colors disabled:opacity-50">
                          <Trash2 className="h-3 w-3" /> {deleting === row.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-lg rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {isNew ? "Add" : "Edit"}{" "}
                {tabLabels[tab].replace(/s$/, "").replace(/ie$/, "y")}
              </h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">{f.label}</label>
                  {f.type === "boolean" ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!editing[f.key]}
                        onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                        className="h-4 w-4 rounded border-border"
                      />
                      <span className="text-sm">{editing[f.key] ? "Yes" : "No"}</span>
                    </label>
                  ) : f.type === "textarea" || f.type === "results" ? (
                    <textarea
                      rows={f.type === "results" ? 6 : 3}
                      className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                      value={f.type === "results" ? (editing._resultsStr ?? "") : (editing[f.key] ?? "")}
                      onChange={(e) => setEditing({ ...editing, [f.type === "results" ? "_resultsStr" : f.key]: e.target.value })}
                    />
                  ) : f.type === "number" ? (
                    <input
                      type="number"
                      className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                      value={editing[f.key] ?? 0}
                      onChange={(e) => setEditing({ ...editing, [f.key]: parseInt(e.target.value) || 0 })}
                    />
                  ) : f.type === "features" ? (
                    <input
                      className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                      value={editing._featuresStr ?? (Array.isArray(editing[f.key]) ? editing[f.key].join(", ") : editing[f.key] ?? "")}
                      onChange={(e) => setEditing({ ...editing, _featuresStr: e.target.value })}
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  ) : (
                    <input
                      className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {saving ? "Saving..." : isNew ? "Create" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
