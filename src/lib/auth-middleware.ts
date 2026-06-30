import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin-token";

export const requireAdminAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getRequest();
    const authHeader = request?.headers?.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token || token !== ADMIN_TOKEN) {
      throw new Response("Unauthorized", { status: 401 });
    }

    return next({ context: { adminToken: token } });
  }
);
