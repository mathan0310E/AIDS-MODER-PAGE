import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface StatItem {
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  provenance?: string;
}

const fields = [
  { name: "label", label: "Label", type: "text", required: true },
  { name: "value", label: "Value", type: "text", required: true },
  { name: "numericValue", label: "Numeric value (for count-up)", type: "number" },
  { name: "suffix", label: "Suffix (e.g. yrs)", type: "text" },
  { name: "provenance", label: "Provenance / source", type: "text", full: true },
] as const;

export default async function StatsAdminPage() {
  await requireAdmin();
  const items = await readCollection<StatItem>("stats");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const num = formData.get("numericValue") as string;
    const item: StatItem = {
      label: (formData.get("label") as string) || "",
      value: (formData.get("value") as string) || "",
      numericValue: num ? Number(num) : undefined,
      suffix: (formData.get("suffix") as string) || undefined,
      provenance: (formData.get("provenance") as string) || undefined,
    };
    const all = await readCollection<StatItem>("stats");
    const idx = all.findIndex((s) => s.label === item.label);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("stats" as Collection, all, `Update stat: ${item.label}`);
    revalidatePath("/");
    redirect("/admin/stats");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const label = formData.get("label") as string;
    const all = await readCollection<StatItem>("stats");
    await writeCollection(
      "stats" as Collection,
      all.filter((s) => s.label !== label),
      `Delete stat: ${label}`,
    );
    revalidatePath("/");
    redirect("/admin/stats");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Hero Stats</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        The key figures shown in the hero section.
      </p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new stat</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((s) => (
          <details key={s.label} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-display text-sm font-medium text-mist">{s.label}</span>
                <span className="ml-2 font-mono text-xs text-mist-faint">
                  {s.value}
                  {s.suffix ?? ""} · {s.provenance ?? ""}
                </span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={s as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="label" value={s.label} />
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
