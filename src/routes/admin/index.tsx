import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { LogOut, Inbox, Users, Briefcase, Eye, X, Trash2, Pencil, Save, LayoutDashboard, FileText } from "lucide-react";
import { getInquiries, deleteInquiry, updateInquiry } from "@/lib/admin.functions";
import { ContentManager } from "@/components/ContentManager";
import AdminChart from "@/components/AdminChart";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — AI-Solutions" }],
  }),
  component: AdminDashboard,
});

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  country: string | null;
  job_title: string | null;
  job_details: string | null;
  created_at: string;
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [editing, setEditing] = useState<Inquiry | null>(null);
  const [authed, setAuthed] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<"inquiries" | "content">("inquiries");

  const loadInquiries = useCallback(async () => {
    try {
      const result = await getInquiries();
      setInquiries(result.inquiries as Inquiry[]);
    } catch (e) {
      console.error("Failed to load inquiries", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate({ to: "/admin/login" });
      return;
    }
    setAuthed(true);
    loadInquiries();
  }, [navigate, loadInquiries]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setDeleting(id);
    try {
      await deleteInquiry({ data: { id } });
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      console.error("Delete failed", e);
      alert("Failed to delete inquiry");
    } finally {
      setDeleting(null);
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await updateInquiry({
        data: {
          id: editing.id,
          name: editing.name,
          email: editing.email,
          phone: editing.phone,
          company_name: editing.company_name,
          country: editing.country,
          job_title: editing.job_title,
          job_details: editing.job_details,
        },
      });
      setInquiries((prev) => prev.map((i) => (i.id === editing.id ? editing : i)));
      setEditing(null);
    } catch (e) {
      console.error("Update failed", e);
      alert("Failed to update inquiry");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("admin_token");
    navigate({ to: "/admin/login" });
  };

  if (!authed) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Admin <span className="glow-text">Dashboard</span>
        </h1>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      {/* Section Toggle */}
      <div className="mb-8 flex gap-2">
        <button
          onClick={() => setSection("inquiries")}
          className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${section === "inquiries" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
        >
          <LayoutDashboard className="h-4 w-4" /> Inquiries
        </button>
        <button
          onClick={() => setSection("content")}
          className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${section === "content" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}
        >
          <FileText className="h-4 w-4" /> Content Management
        </button>
      </div>

      {section === "content" ? (
        <ContentManager />
      ) : (
      <>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Inbox className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">{inquiries.length}</div>
              <div className="text-sm text-muted-foreground">Total Inquiries</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {new Set(inquiries.map((i) => i.company_name).filter(Boolean)).size}
              </div>
              <div className="text-sm text-muted-foreground">Unique Companies</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">
                {inquiries.filter((i) => i.job_details).length}
              </div>
              <div className="text-sm text-muted-foreground">With Job Details</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <AdminChart inquiries={inquiries} />
        <div className="glass-card rounded-xl p-4">
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Quick Summary</h4>
          <div className="text-sm text-foreground/90">
            <div>- Total inquiries: {inquiries.length}</div>
            <div>- Unique companies: {new Set(inquiries.map((i) => i.company_name).filter(Boolean)).size}</div>
            <div>- With job details: {inquiries.filter((i) => i.job_details).length}</div>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-muted-foreground">Loading...</div>
      ) : inquiries.length === 0 ? (
        <div className="glass-card rounded-xl py-20 text-center text-muted-foreground">
          No inquiries yet.
        </div>
      ) : (
        <div className="glass-card overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/30">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Company</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Country</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{inq.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inq.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inq.company_name || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inq.country || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(inq.created_at).toISOString().split('T')[0]}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(inq)}
                          className="inline-flex items-center gap-1 rounded-md bg-primary/20 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/30 transition-colors"
                        >
                          <Eye className="h-3 w-3" /> View
                        </button>
                        <button
                          onClick={() => setEditing({ ...inq })}
                          className="inline-flex items-center gap-1 rounded-md bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground hover:bg-accent/30 transition-colors"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          disabled={deleting === inq.id}
                          className="inline-flex items-center gap-1 rounded-md bg-destructive/20 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/30 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-3 w-3" /> {deleting === inq.id ? "..." : "Delete"}
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

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Inquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium text-primary">Name:</span> {selected.name}</div>
              <div><span className="font-medium text-primary">Email:</span> {selected.email}</div>
              <div><span className="font-medium text-primary">Phone:</span> {selected.phone || "—"}</div>
              <div><span className="font-medium text-primary">Company:</span> {selected.company_name || "—"}</div>
              <div><span className="font-medium text-primary">Country:</span> {selected.country || "—"}</div>
              <div><span className="font-medium text-primary">Job Title:</span> {selected.job_title || "—"}</div>
              <div>
                <span className="font-medium text-primary">Job Details:</span>
                <p className="mt-1 rounded-lg bg-secondary/50 p-3 whitespace-pre-wrap">
                  {selected.job_details || "No details provided"}
                </p>
              </div>
              <div><span className="font-medium text-primary">Submitted:</span> {new Date(selected.created_at).toISOString().replace('T', ' ').split('.')[0]}</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-lg rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Edit Inquiry</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                <input
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <input
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.email}
                  onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                <input
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.phone || ""}
                  onChange={(e) => setEditing({ ...editing, phone: e.target.value || null })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
                <input
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.company_name || ""}
                  onChange={(e) => setEditing({ ...editing, company_name: e.target.value || null })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Country</label>
                <input
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.country || ""}
                  onChange={(e) => setEditing({ ...editing, country: e.target.value || null })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Job Title</label>
                <input
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.job_title || ""}
                  onChange={(e) => setEditing({ ...editing, job_title: e.target.value || null })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Job Details</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                  value={editing.job_details || ""}
                  onChange={(e) => setEditing({ ...editing, job_details: e.target.value || null })}
                />
              </div>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
