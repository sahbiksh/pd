import { createServerFn } from "@tanstack/react-start";
import { requireAdminAuth } from "@/lib/auth-middleware";
import { withAuthHeaders } from "@/lib/auth-client.middleware";
import { z } from "zod";

export const getInquiries = createServerFn({ method: "GET" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .handler(async () => {
    const { mongoDb, ensureConnected } = await import("@/integrations/mongodb/client.server");
    await ensureConnected();
    const inquiries = await mongoDb
      .collection("contact_inquiries")
      .find()
      .sort({ created_at: -1 })
      .toArray();

    // Convert MongoDB special types (ObjectId, Date) to serializable values
    const serializable = (inquiries || []).map((doc: any) => ({
      ...doc,
      _id: doc._id?.toString?.() || doc._id,
      created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : doc.created_at,
    }));

    return { inquiries: serializable };
  });

export const deleteInquiry = createServerFn({ method: "POST" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { mongoDb, ensureConnected } = await import("@/integrations/mongodb/client.server");
    await ensureConnected();

    const result = await mongoDb
      .collection("contact_inquiries")
      .deleteOne({ id: data.id });

    if (result.deletedCount !== 1) {
      console.error("Delete inquiry error: no document deleted", data.id);
      throw new Error("Failed to delete inquiry");
    }

    return { success: true };
  });

export const updateInquiry = createServerFn({ method: "POST" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .inputValidator((data: unknown) =>
    z.object({
      id: z.string().uuid(),
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().nullable(),
      company_name: z.string().nullable(),
      country: z.string().nullable(),
      job_title: z.string().nullable(),
      job_details: z.string().nullable(),
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { mongoDb, ensureConnected } = await import("@/integrations/mongodb/client.server");
    await ensureConnected();
    const { id, ...updates } = data;

    const result = await mongoDb
      .collection("contact_inquiries")
      .updateOne({ id }, { $set: updates });

    if (result.matchedCount !== 1) {
      console.error("Update inquiry error: no document found", data.id);
      throw new Error("Failed to update inquiry");
    }

    return { success: true };
  });
