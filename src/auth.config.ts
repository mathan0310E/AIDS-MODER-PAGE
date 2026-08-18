import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible auth config (no Node-only APIs) — used by middleware.
 * The full config with the Google provider lives in src/auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const path = request.nextUrl.pathname;
      const isAdminRoute = path.startsWith("/admin");
      // Always allow the login page through (it has its own redirect).
      if (path === "/admin/login") {
        return true;
      }
      // Protect the rest of /admin.
      if (isAdminRoute) {
        return isLoggedIn;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
