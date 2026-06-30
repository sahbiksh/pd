import { createServerFn } from "@tanstack/react-start";
import { requireAdminAuth } from "@/lib/auth-middleware";
import { withAuthHeaders } from "@/lib/auth-client.middleware";
import { z } from "zod";

const contentTables = ["blog_articles", "events", "gallery_photos", "services", "case_studies"] as const;

type ContentTable = (typeof contentTables)[number];

async function getCollection(table: ContentTable) {
  const { mongoDb, ensureConnected } = await import("@/integrations/mongodb/client.server");
  await ensureConnected();
  return mongoDb.collection(table);
}

// Convert MongoDB special types (ObjectId, Date) to serializable values
function normalizeDocument(doc: any): any {
  if (!doc) return doc;
  return {
    ...doc,
    _id: doc._id?.toString?.() || doc._id,
    created_at: doc.created_at instanceof Date ? doc.created_at.toISOString() : doc.created_at,
    published_date: doc.published_date instanceof Date ? doc.published_date.toISOString() : doc.published_date,
    updated_at: doc.updated_at instanceof Date ? doc.updated_at.toISOString() : doc.updated_at,
  };
}

export const getPublicArticles = createServerFn({ method: "GET" }).handler(async () => {
  const collection = await getCollection("blog_articles");
  const docs = await collection.find({ published: true }).sort({ published_date: -1 }).toArray();
  return (docs || []).map(normalizeDocument);
});
export const getPublicEvents = createServerFn({ method: "GET" }).handler(async () => {
  const collection = await getCollection("events");
  const docs = await collection.find({ published: true }).sort({ created_at: -1 }).toArray();
  return (docs || []).map(normalizeDocument);
});

export const getPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  const collection = await getCollection("gallery_photos");
  const docs = await collection.find({ published: true }).sort({ display_order: 1 }).toArray();
  return (docs || []).map(normalizeDocument);
});

export const getPublicServices = createServerFn({ method: "GET" }).handler(async () => {
  const collection = await getCollection("services");
  const docs = await collection.find({ published: true }).sort({ display_order: 1 }).toArray();
  return (docs || []).map(normalizeDocument);
});

export const getPublicCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const collection = await getCollection("case_studies");
  const docs = await collection.find({ published: true }).sort({ display_order: 1 }).toArray();
  return (docs || []).map(normalizeDocument);
});

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .inputValidator((data: unknown) => z.object({ table: z.enum([...contentTables]) }).parse(data))
  .handler(async ({ data }) => {
    const collection = await getCollection(data.table);
    const rows = await collection.find().sort({ created_at: -1 }).toArray();
    return (rows || []).map(normalizeDocument);
  });

export const createContent = createServerFn({ method: "POST" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .inputValidator((data: unknown) => z.object({ table: z.enum([...contentTables]), record: z.record(z.any()) }).parse(data))
  .handler(async ({ data }) => {
    const collection = await getCollection(data.table);
    await collection.insertOne({
      ...data.record,
      id: data.record.id || crypto.randomUUID(),
      created_at: new Date(),
    });
    return { success: true };
  });

export const updateContent = createServerFn({ method: "POST" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .inputValidator((data: unknown) => z.object({ table: z.enum([...contentTables]), id: z.string().uuid(), record: z.record(z.any()) }).parse(data))
  .handler(async ({ data }) => {
    const collection = await getCollection(data.table);
    const result = await collection.updateOne({ id: data.id }, { $set: data.record });
    if (result.matchedCount !== 1) {
      throw new Error("Failed to update record");
    }
    return { success: true };
  });

export const deleteContent = createServerFn({ method: "POST" })
  .middleware([withAuthHeaders, requireAdminAuth])
  .inputValidator((data: unknown) => z.object({ table: z.enum([...contentTables]), id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const collection = await getCollection(data.table);
    const result = await collection.deleteOne({ id: data.id });
    if (result.deletedCount !== 1) {
      throw new Error("Failed to delete record");
    }
    return { success: true };
  });
