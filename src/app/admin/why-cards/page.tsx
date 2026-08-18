import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface WhyCard {
  title: string;
  description: string;
  icon: string;
}

const fields = [
  { name: "title", label: "Title", type: "text", required: true, full: true },
  { name: "icon", label: "Icon (brain | network | chart | layers | analytics | spark)", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true, full: true },
] as const;

export default async function WhyCardsAdminPage() {
  await requireAdmin();
  const items = await readCollection<WhyCard>("whyCards");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const item: WhyCard = {
      title: (formData.get("title") as string) || "",
      icon: (formData.get("icon") as string) || "spark",
      description: (formData.get("description") as string) || "",
    };
    const all = await readCollection<WhyCard>("whyCards");
    const idx = all.findIndex((c) => c.title === item.title);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("whyCards" as Collection, all, `Update why card: ${item.title}`);
    revalidatePath("/");
    redirect("/admin/why-cards");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const title = formData.get("title") as string;
    const all = await readCollection<WhyCard>("whyCards");
    await writeCollection(
      "whyCards" as Collection,
      all.filter((c) => c.title !== title),
      `Delete why card: ${title}`,
    );
    revalidatePath("/");
    redirect("/admin/why-cards");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Why AI &amp; DS Cards</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        The six discipline cards in the &ldquo;Why AI &amp; DS?&rdquo; section.
      </p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new card</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((c) => (
          <details key={c.title} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-display text-sm font-medium text-mist">{c.title}</span>
                <span className="ml-2 font-mono text-xs text-mist-faint">icon: {c.icon}</span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={c as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="title" value={c.title} />
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
