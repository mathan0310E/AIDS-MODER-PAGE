import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";
import { adminSlug } from "@/components/admin/StringListPage";

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "date" | "textarea" | "number" | "email";
  required?: boolean;
  full?: boolean;
}

/**
 * Admin page factory for a JSON collection that is an array of objects.
 * `titleField` names the field used for the summary line & id slug.
 * `build` maps raw form values into the stored object shape.
 */
export function makeObjectListPage<T extends { id: string }>(opts: {
  collection: Collection;
  title: string;
  description: string;
  fields: readonly FieldDef[];
  titleField: keyof T & string;
  subtitleField?: keyof T & string;
  build: (formData: FormData, id: string) => T;
}) {
  const path = `/admin/${adminSlug(opts.collection)}`;

  return async function ObjectListAdminPage() {
    await requireAdmin();
    const items = await readCollection<T>(opts.collection);

    async function upsert(formData: FormData) {
      "use server";
      await requireAdmin();
      const title = (formData.get(opts.titleField) as string) || "";
      const id =
        (formData.get("id") as string) ||
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
        `item-${Date.now()}`;
      const item = opts.build(formData, id);
      const all = await readCollection<T>(opts.collection);
      const idx = all.findIndex((n) => n.id === id);
      if (idx >= 0) all[idx] = item;
      else all.unshift(item);
      await writeCollection(opts.collection, all, `Update ${opts.collection}: ${title}`);
      revalidatePath("/");
      redirect(path);
    }

    async function remove(formData: FormData) {
      "use server";
      await requireAdmin();
      const id = formData.get("id") as string;
      const all = await readCollection<T>(opts.collection);
      await writeCollection(
        opts.collection,
        all.filter((n) => n.id !== id),
        `Delete ${opts.collection}: ${id}`,
      );
      revalidatePath("/");
      redirect(path);
    }

    return (
      <>
        <h1 className="font-display text-3xl font-bold text-mist">{opts.title}</h1>
        <p className="mt-2 font-display text-sm text-mist-soft">{opts.description}</p>
        <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
          <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
          <SimpleItemForm action={upsert} fields={opts.fields} />
        </div>
        <div className="mt-10 space-y-4">
          <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
            Existing ({items.length})
          </h2>
          {items.map((n) => (
            <details key={n.id} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <span>
                  <span className="font-display text-sm font-medium text-mist">
                    {String(n[opts.titleField] ?? n.id)}
                  </span>
                  {opts.subtitleField && (
                    <span className="ml-2 font-mono text-xs text-mist-faint">
                      {String(n[opts.subtitleField] ?? "")}
                    </span>
                  )}
                </span>
                <span className="font-mono text-xs text-mist-faint">edit</span>
              </summary>
              <div className="mt-4">
                <SimpleItemForm action={upsert} fields={opts.fields} item={n as unknown as Record<string, unknown>} />
                <form action={remove} className="mt-4">
                  <input type="hidden" name="id" value={n.id} />
                  <button className="rounded-md border border-rose-500/40 px-4 py-2 font-display text-xs text-rose-400 hover:bg-rose-500/10">
                    Delete
                  </button>
                </form>
              </div>
            </details>
          ))}
          {items.length === 0 && (
            <p className="rounded-lg border border-dashed border-mist-faint/20 bg-void-3/40 px-4 py-5 text-sm italic text-mist-soft">
              Nothing here yet — add the first entry above.
            </p>
          )}
        </div>
      </>
    );
  };
}
