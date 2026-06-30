import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin-token";

export const authenticateAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(1),
      })
      .parse(data)
  )
  .handler(async ({ data }) => {
    if (data.email !== ADMIN_EMAIL || data.password !== ADMIN_PASSWORD) {
      throw new Error("Invalid credentials");
    }

    return { token: ADMIN_TOKEN };
  });
