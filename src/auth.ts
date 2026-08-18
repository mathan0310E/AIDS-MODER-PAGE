import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { authConfig } from "@/auth.config";

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

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
      // Dev bypass so the preview is browsable without Google creds configured.
      if (
        process.env.NODE_ENV === "development" &&
        adminEmails.length === 0
      ) {
        return true;
      }
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
    process.env.NODE_ENV === "development" && adminEmails.length === 0
      ? true
      : adminEmails.includes(email);
  if (!allowed) {
    throw new Error("FORBIDDEN");
  }
  return session;
}
