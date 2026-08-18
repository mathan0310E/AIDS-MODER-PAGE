import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AnnouncementItem { id: string; text: string }

export default async function AnnouncementsAdminPage() {
  await requireAdmin();
  const raw = await readCollection<string>("announcements");
  // Normalise to {id, text} for editing.
  const items: AnnouncementItem[] = raw.map((text, i) => ({ id: `a${i}`, text }));

  async function saveAll(formData: FormData) {
    "use server";
    await requireAdmin();
    // Process delete checkboxes
    const delIndices = new Set<number>();
    for (const [key] of formData.entries()) {
      if (key.startsWith("del-")) {
        const idx = Number(key.replace("del-", ""));
        if (!isNaN(idx)) delIndices.add(idx);
      }
    }
    // Collect entries, exclude deleted ones
    const entries = [...formData.entries()].filter(([k]) => k.startsWith("ann-"));
    const texts = entries
      .sort((a, b) => a[0].localeCompare(b[0]))
      .filter(([, v]) => (v as string).trim().length > 0)
      .filter(([, ], i) => {
        // Map sorted index back to original index
        const origKey = entries.sort((a, b) => a[0].localeCompare(b[0]))[i][0];
        const origIdx = Number(origKey.replace("ann-", ""));
        return !delIndices.has(origIdx);
      })
      .map(([, v]) => (v as string).trim());

    await writeCollection("announcements" as Collection, texts, "Update announcements");
    revalidatePath("/");
    redirect("/admin/announcements");
  }

  async function addNew(formData: FormData) {
    "use server";
    await requireAdmin();
    const text = (formData.get("text") as string).trim();
    if (!text) redirect("/admin/announcements");
    const all = await readCollection<string>("announcements");
    all.push(text);
    await writeCollection("announcements" as Collection, all, "Add announcement");
    revalidatePath("/");
    redirect("/admin/announcements");
  }

  async function removeOne(formData: FormData) {
    "use server";
    await requireAdmin();
    const idx = Number(formData.get("index"));
    const all = await readCollection<string>("announcements");
    if (Number.isInteger(idx) && idx >= 0 && idx < all.length) {
      all.splice(idx, 1);
      await writeCollection("announcements" as Collection, all, "Delete announcement");
      revalidatePath("/");
    }
    redirect("/admin/announcements");
  }

  const inputCls = "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist focus:border-cyan/40 focus:outline-none";

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Announcements</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">Short notices shown in the news section sidebar.</p>

      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
        <form action={addNew} className="mt-4 flex gap-3">
          <input name="text" className={inputCls} placeholder="Notice text…" required />
          <button type="submit" className="shrink-0 rounded-md bg-gradient-to-r from-cyan to-violet px-5 py-2 font-display text-sm font-semibold text-void">Add</button>
        </form>
      </div>

      <form action={saveAll} className="mt-8 space-y-3">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">Edit existing ({items.length})</h2>
        {items.map((a, i) => (
          <div key={a.id} className="flex gap-3">
            <input name={`ann-${i}`} defaultValue={a.text} className={inputCls} />
            <label className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-mist-faint">
              <input type="checkbox" name={`del-${i}`} value="1" /> delete
            </label>
          </div>
        ))}
        {items.length > 0 && (
          <button type="submit" className="rounded-md border border-cyan/30 px-5 py-2 font-display text-sm text-cyan hover:bg-cyan/10">Save all changes</button>
        )}
      </form>

      {/* Quick delete fallback */}
      <div className="mt-6">
        {items.map((a, i) => (
          <form key={`del-${a.id}`} action={removeOne} className="inline">
            <input type="hidden" name="index" value={i} />
            <button className="font-mono text-[11px] text-rose-400/70 hover:text-rose-400">delete &ldquo;{a.text.slice(0, 30)}…&rdquo;</button>
            <span className="mx-2 text-mist-faint/30">·</span>
          </form>
        ))}
      </div>
    </>
  );
}
