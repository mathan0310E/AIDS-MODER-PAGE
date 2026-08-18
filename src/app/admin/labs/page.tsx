import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface Lab {
  id: string;
  name: string;
  focus: string;
  equipment: string[];
  software: string[];
}

const fields = [
  { name: "id", label: "ID (slug)", type: "text", required: true },
  { name: "name", label: "Lab name", type: "text", required: true, full: true },
  { name: "focus", label: "Focus", type: "textarea", required: true, full: true },
  { name: "equipment", label: "Equipment (comma-separated)", type: "text", full: true },
  { name: "software", label: "Software (comma-separated)", type: "text", full: true },
] as const;

export default async function LabsAdminPage() {
  await requireAdmin();
  const items = await readCollection<Lab>("laboratories");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = (formData.get("id") as string) || "";
    const split = (v: string) =>
      v.split(",").map((x) => x.trim()).filter(Boolean);
    const item: Lab = {
      id,
      name: (formData.get("name") as string) || "",
      focus: (formData.get("focus") as string) || "",
      equipment: split((formData.get("equipment") as string) || ""),
      software: split((formData.get("software") as string) || ""),
    };
    const all = await readCollection<Lab>("laboratories");
    const idx = all.findIndex((l) => l.id === id);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("laboratories" as Collection, all, `Update lab: ${item.name}`);
    revalidatePath("/");
    redirect("/admin/labs");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = formData.get("id") as string;
    const all = await readCollection<Lab>("laboratories");
    await writeCollection(
      "laboratories" as Collection,
      all.filter((l) => l.id !== id),
      `Delete lab: ${id}`,
    );
    revalidatePath("/");
    redirect("/admin/labs");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Laboratories</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Labs shown in the Labs section. Equipment &amp; software are comma-separated lists.
      </p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new lab</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((l) => (
          <details key={l.id} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-display text-sm font-medium text-mist">{l.name}</span>
                <span className="ml-2 font-mono text-xs text-mist-faint">{l.id}</span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm
                action={upsert}
                fields={fields}
                item={{
                  ...l,
                  equipment: l.equipment.join(", "),
                  software: l.software.join(", "),
                } as unknown as Record<string, unknown>}
              />
              <form action={remove} className="mt-4">
                <input type="hidden" name="id" value={l.id} />
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
