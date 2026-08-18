import { requireAdmin } from "@/auth";
import { readSetting, writeSetting, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist focus:border-cyan/40 focus:outline-none";
const labelCls =
  "mb-1.5 block font-mono text-[11px] tracking-widest text-mist-faint uppercase";

interface Vision {
  vision: string;
  mission: string;
  hodMessage: string;
}

export default async function VisionAdminPage() {
  await requireAdmin();
  const v = await readSetting<Vision>("vision");

  async function save(formData: FormData) {
    "use server";
    await requireAdmin();
    const get = (k: string) => (formData.get(k) as string) || "";
    await writeSetting(
      "vision" as Collection,
      { vision: get("vision"), mission: get("mission"), hodMessage: get("hodMessage") },
      "Update vision & mission",
    );
    revalidatePath("/");
    redirect("/admin/vision");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Vision &amp; Mission</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        The vision, mission and Head of Department message shown in the About section.
      </p>

      <form action={save} className="mt-8 grid gap-5 rounded-lg border border-cyan/15 bg-void-2/50 p-6">
        <div>
          <label className={labelCls}>Vision</label>
          <textarea name="vision" defaultValue={v.vision} rows={3} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Mission</label>
          <textarea name="mission" defaultValue={v.mission} rows={3} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Head of Department message</label>
          <textarea name="hodMessage" defaultValue={v.hodMessage} rows={4} className={inputCls} />
        </div>
        <div>
          <button type="submit" className="rounded-md bg-gradient-to-r from-cyan to-violet px-6 py-2.5 font-display text-sm font-semibold text-void hover:shadow-[0_0_20px_rgba(0,229,255,0.35)]">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
