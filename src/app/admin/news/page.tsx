import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
}

const fields = [
  { name: "title", label: "Title", type: "text", required: true, full: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "category", label: "Category", type: "text", required: false },
  { name: "summary", label: "Summary", type: "textarea", required: true, full: true },
] as const;

export default async function NewsAdminPage() {
  await requireAdmin();
  const items = await readCollection<NewsItem>("news");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = (formData.get("id") as string) || (formData.get("title") as string).toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const item: NewsItem = {
      id,
      title: (formData.get("title") as string) || "",
      date: (formData.get("date") as string) || new Date().toISOString().slice(0, 10),
      category: (formData.get("category") as string) || "Department",
      summary: (formData.get("summary") as string) || "",
    };
    const all = await readCollection<NewsItem>("news");
    const idx = all.findIndex((n) => n.id === id);
    if (idx >= 0) all[idx] = item; else all.unshift(item);
    await writeCollection("news" as Collection, all, `Update news: ${item.title}`);
    revalidatePath("/");
    redirect("/admin/news");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = formData.get("id") as string;
    const all = await readCollection<NewsItem>("news");
    await writeCollection("news" as Collection, all.filter((n) => n.id !== id), `Delete news: ${id}`);
    revalidatePath("/");
    redirect("/admin/news");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">News</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">Department news &amp; academic announcements.</p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">Existing ({items.length})</h2>
        {items.map((n) => (
          <details key={n.id} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-display text-sm font-medium text-mist">{n.title}</span>
                <span className="ml-2 font-mono text-xs text-mist-faint">{n.date} · {n.category}</span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={n as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="id" value={n.id} />
                <button className="rounded-md border border-rose-500/40 px-4 py-2 font-display text-xs text-rose-400 hover:bg-rose-500/10">Delete</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
