import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface Item {
  title: string;
  description: string;
}

const fields = [
  { name: "title", label: "Title", type: "text", required: true, full: true },
  { name: "description", label: "Description", type: "textarea", required: true, full: true },
] as const;

export default async function PlacementAdminPage() {
  await requireAdmin();
  const items = await readCollection<Item>("placementSupport");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const item: Item = {
      title: (formData.get("title") as string) || "",
      description: (formData.get("description") as string) || "",
    };
    const all = await readCollection<Item>("placementSupport");
    const idx = all.findIndex((p) => p.title === item.title);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("placementSupport" as Collection, all, `Update placement: ${item.title}`);
    revalidatePath("/");
    redirect("/admin/placement");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const title = formData.get("title") as string;
    const all = await readCollection<Item>("placementSupport");
    await writeCollection(
      "placementSupport" as Collection,
      all.filter((p) => p.title !== title),
      `Delete placement: ${title}`,
    );
    revalidatePath("/");
    redirect("/admin/placement");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Placement Support</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Cards in the Careers / placement-support area.
      </p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((p) => (
          <details key={p.title} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span className="font-display text-sm font-medium text-mist">{p.title}</span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={p as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="title" value={p.title} />
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
