import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SimpleItemForm } from "@/components/admin/SimpleItemForm";

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "entry";
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  blurb: string;
  technologies: string[];
  status: "Ongoing" | "Completed" | "Recruiting";
}

const fields = [
  { name: "title", label: "Title", type: "text", required: true, full: true },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "status", label: "Status (Ongoing/Completed/Recruiting)", type: "text", required: true },
  { name: "technologies", label: "Technologies (comma-separated)", type: "text", required: false },
  { name: "blurb", label: "Blurb", type: "textarea", required: true, full: true },
] as const;

export default async function ProjectsAdminPage() {
  await requireAdmin();
  const items = await readCollection<ProjectItem>("projects");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = (formData.get("id") as string) || slug(formData.get("title") as string);
    const techRaw = (formData.get("technologies") as string) || "";
    const item: ProjectItem = {
      id,
      title: (formData.get("title") as string) || "",
      category: (formData.get("category") as string) || "AI",
      status: ((formData.get("status") as string) || "Ongoing") as ProjectItem["status"],
      technologies: techRaw.split(",").map((s) => s.trim()).filter(Boolean),
      blurb: (formData.get("blurb") as string) || "",
    };
    const all = await readCollection<ProjectItem>("projects");
    const idx = all.findIndex((p) => p.id === id);
    if (idx >= 0) all[idx] = item; else all.push(item);
    await writeCollection("projects" as Collection, all, `Update project: ${item.title}`);
    revalidatePath("/");
    redirect("/admin/projects");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = formData.get("id") as string;
    const all = await readCollection<ProjectItem>("projects");
    await writeCollection("projects" as Collection, all.filter((p) => p.id !== id), `Delete project: ${id}`);
    revalidatePath("/");
    redirect("/admin/projects");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Student Projects</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">Showcase projects with categories &amp; technologies.</p>
      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
        <SimpleItemForm action={upsert} fields={fields} />
      </div>
      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">Existing ({items.length})</h2>
        {items.map((p) => (
          <details key={p.id} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="font-display text-sm font-medium text-mist">{p.title}</span>
                <span className="ml-2 font-mono text-xs text-mist-faint">{p.category} · {p.status}</span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <SimpleItemForm action={upsert} fields={fields} item={{ ...p, technologies: p.technologies.join(", ") } as unknown as Record<string, unknown>} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="id" value={p.id} />
                <button className="rounded-md border border-rose-500/40 px-4 py-2 font-display text-xs text-rose-400 hover:bg-rose-500/10">Delete</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
