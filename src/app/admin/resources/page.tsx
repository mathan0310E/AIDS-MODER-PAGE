import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface Resource {
  name: string;
  url: string;
  description: string;
}

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "url", label: "URL", type: "text", required: true, full: true },
  { name: "description", label: "Description", type: "textarea", required: true, full: true },
] as const;

export default async function ResourcesAdminPage() {
  await requireAdmin();
  const items = await readCollection<Resource>("studentResources");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const item: Resource = {
      name: (formData.get("name") as string) || "",
      url: (formData.get("url") as string) || "",
      description: (formData.get("description") as string) || "",
    };
    const all = await readCollection<Resource>("studentResources");
    const idx = all.findIndex((r) => r.name === item.name);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("studentResources" as Collection, all, `Update resource: ${item.name}`);
    revalidatePath("/");
    redirect("/admin/resources");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const name = formData.get("name") as string;
    const all = await readCollection<Resource>("studentResources");
    await writeCollection(
      "studentResources" as Collection,
      all.filter((r) => r.name !== name),
      `Delete resource: ${name}`,
    );
    revalidatePath("/");
    redirect("/admin/resources");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Student Resources</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        External learning resources shown to students.
      </p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new resource</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((r) => (
          <details key={r.name} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-display text-sm font-medium text-mist">{r.name}</span>
                <span className="ml-2 font-mono text-xs text-mist-faint">{r.url}</span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={r as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="name" value={r.name} />
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
