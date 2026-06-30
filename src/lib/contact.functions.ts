import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional(),
  company_name: z.string().max(200).optional(),
  country: z.string().max(100).optional(),
  job_title: z.string().max(200).optional(),
  job_details: z.string().max(5000).optional(),
});

export const submitContactInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { mongoDb, ensureConnected } = await import("@/integrations/mongodb/client.server");
    await ensureConnected();

    await mongoDb.collection("contact_inquiries").insertOne({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company_name: data.company_name || null,
      country: data.country || null,
      job_title: data.job_title || null,
      job_details: data.job_details || null,
      created_at: new Date(),
    });

    return { success: true };
  });
