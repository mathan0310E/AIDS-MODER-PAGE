import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface Faq {
  q: string;
  a: string;
}

const fields = [
  { name: "q", label: "Question", type: "text", required: true, full: true },
  { name: "a", label: "Answer", type: "textarea", required: true, full: true },
] as const;

export default async function FaqsAdminPage() {
  await requireAdmin();
  const items = await readCollection<Faq>("faqs");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const item: Faq = {
      q: (formData.get("q") as string) || "",
      a: (formData.get("a") as string) || "",
    };
    const all = await readCollection<Faq>("faqs");
    const idx = all.findIndex((f) => f.q === item.q);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("faqs" as Collection, all, `Update FAQ: ${item.q}`);
    revalidatePath("/");
    redirect("/admin/faqs");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const q = formData.get("q") as string;
    const all = await readCollection<Faq>("faqs");
    await writeCollection(
      "faqs" as Collection,
      all.filter((f) => f.q !== q),
      `Delete FAQ: ${q}`,
    );
    revalidatePath("/");
    redirect("/admin/faqs");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">FAQs</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Frequently asked questions shown in the contact section.
      </p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new FAQ</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((f) => (
          <details key={f.q} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span className="font-display text-sm font-medium text-mist">{f.q}</span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={f as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="q" value={f.q} />
                <button className="rounded-md border border-rose-500/40 px-4 py-2 font-display text-xs text-rose-400 hover:bg-rose-500/10">
                  Delete
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
