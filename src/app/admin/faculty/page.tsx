import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, uploadAsset, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FacultyForm } from "@/components/admin/FacultyForm";

interface FacultyItem {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string[];
  email: string;
  photo?: string;
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "entry";
}

export default async function FacultyAdminPage() {
  await requireAdmin();
  const items = await readCollection<FacultyItem>("faculty");

  async function upsert(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = (formData.get("id") as string) || slug(formData.get("name") as string);
    const specRaw = (formData.get("specialization") as string) || "";
    const specialization = specRaw.split(",").map((s) => s.trim()).filter(Boolean);
    const item: FacultyItem = {
      id,
      name: (formData.get("name") as string) || "Untitled",
      designation: (formData.get("designation") as string) || "",
      qualification: (formData.get("qualification") as string) || "",
      specialization,
      email: (formData.get("email") as string) || "",
      photo: (formData.get("existingPhoto") as string) || "",
    };

    const photo = formData.get("photo") as File | null;
    if (photo && photo.size > 0) {
      const buf = Buffer.from(await photo.arrayBuffer());
      const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
      const filename = `${id}.${ext}`;
      const res = await uploadAsset(filename, buf.toString("base64"), `Upload photo for ${item.name}`);
      if (res.path) item.photo = res.path;
    }

    const all = await readCollection<FacultyItem>("faculty");
    const idx = all.findIndex((f) => f.id === id);
    if (idx >= 0) all[idx] = item;
    else all.push(item);
    await writeCollection("faculty" as Collection, all, `Update faculty: ${item.name}`);
    revalidatePath("/");
    redirect("/admin/faculty");
  }

  async function remove(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = formData.get("id") as string;
    const all = await readCollection<FacultyItem>("faculty");
    await writeCollection("faculty" as Collection, all.filter((f) => f.id !== id), `Delete faculty: ${id}`);
    revalidatePath("/");
    redirect("/admin/faculty");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Faculty</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Add, edit or remove faculty members. Upload a photo for each.
      </p>

      <div className="mt-8 rounded-lg border border-cyan/15 bg-void-2/50 p-5">
        <h2 className="font-display text-lg font-semibold text-cyan">Add new</h2>
        <FacultyForm action={upsert} />
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="font-mono text-xs tracking-widest text-mist-faint uppercase">
          Existing ({items.length})
        </h2>
        {items.map((m) => (
          <details key={m.id} className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo} alt={m.name} className="size-10 rounded-full object-cover" />
                ) : (
                  <span className="grid size-10 place-items-center rounded-full bg-void text-cyan/40">👤</span>
                )}
                <span>
                  <span className="font-display text-sm font-medium text-mist">{m.name}</span>
                  <span className="ml-2 font-mono text-xs text-mist-faint">{m.designation}</span>
                </span>
              </span>
              <span className="font-mono text-xs text-mist-faint">edit</span>
            </summary>
            <div className="mt-4">
              <FacultyForm action={upsert} item={m} />
              <form action={remove} className="mt-4">
                <input type="hidden" name="id" value={m.id} />
                <button className="rounded-md border border-rose-500/40 px-4 py-2 font-display text-xs text-rose-400 hover:bg-rose-500/10">
                  Delete this faculty member
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
