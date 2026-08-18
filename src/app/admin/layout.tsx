import { auth } from "@/auth";
import { AdminNav } from "@/components/AdminNav";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  // The middleware guards all /admin/* routes except /admin/login.
  // The login page itself redirects to /admin if already authenticated.
  return (
    <div className="relative z-10 min-h-dvh bg-void text-mist">
      {session?.user && <AdminNav email={session.user.email || "admin"} />}
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
