import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().min(10).max(2000),
});

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    const { mongoDb } = await import("@/integrations/mongodb/client.server");

    await mongoDb.collection("client_feedback").insertOne({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      rating: data.rating,
      feedback: data.feedback,
      created_at: new Date(),
    });

    return { success: true };
  });
