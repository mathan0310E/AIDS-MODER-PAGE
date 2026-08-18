import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { authConfig } from "@/auth.config";

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Only allow dev bypass when explicitly enabled — never in production. */
const devBypass = process.env.ADMIN_DEV_BYPASS === "true";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks,
    // Allowlist: only emails in ADMIN_EMAILS may log in.
    async signIn({ user }) {
      const email = user?.email?.toLowerCase();
      if (!email) return false;
      // Dev bypass: only when explicit env flag is set (never in prod by accident).
      if (devBypass && process.env.NODE_ENV !== "production") {
        return true;
      }
      if (adminEmails.length === 0) return false;
      return adminEmails.includes(email);
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email.toLowerCase();
      return token;
    },
    async session({ session, token }) {
      if (token?.email && session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
});

/** Server-side guard for admin Server Actions / route handlers. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("UNAUTHORIZED");
  }
  const email = session.user.email.toLowerCase();
  const allowed =
    devBypass && process.env.NODE_ENV !== "production"
      ? true
      : adminEmails.includes(email);
  if (!allowed) {
    throw new Error("FORBIDDEN");
  }
  return session;
}
