import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist focus:border-cyan/40 focus:outline-none";

export function adminSlug(c: Collection): string {
  const map: Record<Collection, string> = {
    faculty: "faculty",
    news: "news",
    projects: "projects",
    announcements: "announcements",
    site: "settings",
    stats: "stats",
    whyCards: "why-cards",
    semesters: "curriculum",
    laboratories: "labs",
    researchAreas: "research-areas",
    careerOpportunities: "careers",
    placementSupport: "placement",
    studentResources: "resources",
    faqs: "faqs",
    academicDocuments: "academic-docs",
  };
  return map[c];
}

/**
 * Admin page for a JSON collection that is a simple string[].
 * Renders add / edit-all / delete controls.
 */
export function makeStringListPage(opts: {
  collection: Collection;
  title: string;
  description: string;
}) {
  return async function StringListPage() {
    await requireAdmin();
    const items = await readCollection<string>(opts.collection);

    async function addNew(formData: FormData) {
      "use server";
      await requireAdmin();
      const text = (formData.get("text") as string).trim();
      if (!text) redirect(`/admin/${adminSlug(opts.collection)}`);
      const all = await readCollection<string>(opts.collection);
      all.push(text);
      await writeCollection(opts.collection, all, `Add ${opts.collection}: ${text}`);
      revalidatePath("/");
      redirect(`/admin/${adminSlug(opts.collection)}`);
    }

    async function saveAll(formData: FormData) {
      "use server";
      await requireAdmin();
      // Process delete checkboxes first
      const delIndices = new Set<number>();
      for (const [key] of formData.entries()) {
        if (key.startsWith("del-")) {
          const idx = Number(key.replace("del-", ""));
          if (!isNaN(idx)) delIndices.add(idx);
        }
      }
      // Collect remaining items (exclude deleted ones)
      const entries = [...formData.entries()].filter(([k]) => k.startsWith("item-"));
      const texts = entries
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([, v], i) => {
          // The index in the sorted array may differ from the original index
          // We need to map from original key to sorted position
          return (v as string).trim();
        })
        .filter((v) => v.length > 0);

      // Re-filter: remove items whose original index was checked for deletion
      const finalTexts: string[] = [];
      entries
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([, v], sortedIdx) => {
          // Extract original index from key name (item-0, item-1, etc.)
          const key = entries.sort((a, b) => a[0].localeCompare(b[0]))[sortedIdx][0];
          const origIdx = Number(key.replace("item-", ""));
          if (!delIndices.has(origIdx) && (v as string).trim().length > 0) {
            finalTexts.push((v as string).trim());
          }
        });

      await writeCollection(opts.collection, finalTexts, `Update ${opts.collection}`);
      revalidatePath("/");
      redirect(`/admin/${adminSlug(opts.collection)}`);
    }

    async function removeOne(formData: FormData) {
      "use server";
      await requireAdmin();
      const idx = Number(formData.get("index"));
      const all = await readCollection<string>(opts.collection);
      all.splice(idx, 1);
      await writeCollection(opts.collection, all, `Delete ${opts.collection} item`);
      revalidatePath("/");
      redirect(`/admin/${adminSlug(opts.collection)}`);
    }

    return (
      <>
        <h1 className="font-display text-3xl font-bold text-mist">{opts.title}</h1>
        <p className="mt-2 font-display text-sm text-mist-soft">{opts.description}</p>

        <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
          <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
          <form action={addNew} className="mt-4 flex gap-3">
            <input name="text" className={inputCls} placeholder="Add an entry…" required />
            <button type="submit" className="shrink-0 rounded-md bg-gradient-to-r from-cyan to-violet px-5 py-2 font-display text-sm font-semibold text-void">
              Add
            </button>
          </form>
        </div>

        <form action={saveAll} className="mt-8 space-y-3">
          <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
            Edit existing ({items.length})
          </h2>
          {items.map((text, i) => (
            <div key={i} className="flex gap-3">
              <input name={`item-${i}`} defaultValue={text} className={inputCls} />
              <label className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-mist-faint">
                <input type="checkbox" name={`del-${i}`} value="1" /> delete
              </label>
            </div>
          ))}
          {items.length > 0 && (
            <button type="submit" className="rounded-md border border-cyan/30 px-5 py-2 font-display text-sm text-cyan hover:bg-cyan/10">
              Save all changes
            </button>
          )}
        </form>

        <div className="mt-6">
          {items.map((text, i) => (
            <form key={`del-${i}`} action={removeOne} className="inline">
              <input type="hidden" name="index" value={i} />
              <button className="font-mono text-[11px] text-rose-400/70 hover:text-rose-400">
                delete &ldquo;{text.slice(0, 30)}&hellip;&rdquo;
              </button>
              <span className="mx-2 text-mist-faint/30">·</span>
            </form>
          ))}
        </div>
      </>
    );
  };
}
