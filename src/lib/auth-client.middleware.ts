import { createMiddleware } from "@tanstack/react-start";

export const withAuthHeaders = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    if (typeof window === "undefined") return next();

    const token = localStorage.getItem("admin_token");
    if (!token) {
      throw new Error("Not authenticated");
    }

    return next({
      headers: { Authorization: `Bearer ${token}` },
    });
  })
  .server(async ({ next }) => next());
