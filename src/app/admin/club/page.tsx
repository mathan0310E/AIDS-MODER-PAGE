import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist focus:border-cyan/40 focus:outline-none";
const labelCls =
  "mb-1.5 block font-mono text-[11px] tracking-widest text-mist-faint uppercase";

interface Club {
  id: string;
  name: string;
  purpose: string;
  tagline?: string;
  features: string[];
}

export default async function ClubAdminPage() {
  await requireAdmin();
  const all = await readCollection<Club>("club");
  const club = all[0] ?? { id: "club-1", name: "", purpose: "", tagline: "", features: [] };

  async function save(formData: FormData) {
    "use server";
    await requireAdmin();
    const get = (k: string) => (formData.get(k) as string) || "";
    const features = get("features")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const value: Club = {
      id: club.id,
      name: get("name"),
      purpose: get("purpose"),
      tagline: get("tagline"),
      features,
    };
    await writeCollection("club" as Collection, [value], "Update association");
    revalidatePath("/");
    redirect("/admin/club");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Association (AION)</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        The student association shown in the Activities section — name, tagline, purpose and what it does.
      </p>

      <form action={save} className="mt-8 grid gap-5 rounded-lg border border-cyan/15 bg-void-2/50 p-6">
        <div>
          <label className={labelCls}>Association name</label>
          <input name="name" defaultValue={club.name} className={inputCls} required />
        </div>
        <div>
          <label className={labelCls}>Tagline</label>
          <input name="tagline" defaultValue={club.tagline ?? ""} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Purpose</label>
          <textarea name="purpose" defaultValue={club.purpose} rows={3} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>What it does (one per line)</label>
          <textarea name="features" defaultValue={club.features.join("\n")} rows={6} className={inputCls} />
        </div>
        <div>
          <button type="submit" className="rounded-md bg-gradient-to-r from-cyan to-violet px-6 py-2.5 font-display text-sm font-semibold text-void hover:shadow-[0_0_20px_rgba(0,229,255,0.35)]">
            Save association
          </button>
        </div>
      </form>
    </>
  );
}
