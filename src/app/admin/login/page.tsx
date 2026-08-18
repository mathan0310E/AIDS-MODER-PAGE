import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Crest } from "@/components/icons";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="glass-panel w-full max-w-md rounded-xl p-8 text-center">
        <Crest className="mx-auto size-12 text-cyan" />
        <h1 className="mt-5 font-display text-2xl font-bold text-mist">
          Admin sign-in
        </h1>
        <p className="mt-2 font-display text-sm text-mist-soft">
          Sign in with your authorised Google account to manage department
          content.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-mist-faint/25 bg-white px-5 py-3 font-display text-sm font-semibold text-gray-900 transition-transform hover:-translate-y-0.5"
          >
            <GoogleLogo />
            Continue with Google
          </button>
        </form>

        <p className="mt-5 font-mono text-[11px] leading-relaxed text-mist-faint">
          Only emails listed in <code className="text-cyan">ADMIN_EMAILS</code>{" "}
          are allowed. If your Google OAuth is not yet configured, see{" "}
          <code className="text-cyan">ADMIN-SETUP.md</code>.
        </p>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
