import { requireAdmin } from "@/auth";
import { readCollection, writeCollection, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Subject {
  code: string;
  title: string;
  type: string;
}
interface Semester {
  number: number;
  theme: string;
  subjects: Subject[];
}

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist focus:border-cyan/40 focus:outline-none";

export default async function CurriculumAdminPage() {
  await requireAdmin();
  const semesters = await readCollection<Semester>("semesters");

  async function saveTheme(formData: FormData) {
    "use server";
    await requireAdmin();
    const num = Number(formData.get("number"));
    const theme = (formData.get("theme") as string) || "";
    const all = await readCollection<Semester>("semesters");
    const s = all.find((x) => x.number === num);
    if (s) s.theme = theme;
    await writeCollection("semesters" as Collection, all, `Update semester ${num} theme`);
    revalidatePath("/");
    redirect("/admin/curriculum");
  }

  async function addSubject(formData: FormData) {
    "use server";
    await requireAdmin();
    const num = Number(formData.get("number"));
    const subj: Subject = {
      code: (formData.get("code") as string) || "",
      title: (formData.get("title") as string) || "",
      type: (formData.get("type") as string) || "Theory",
    };
    const all = await readCollection<Semester>("semesters");
    const s = all.find((x) => x.number === num);
    if (s) s.subjects.push(subj);
    await writeCollection("semesters" as Collection, all, `Add subject to sem ${num}: ${subj.title}`);
    revalidatePath("/");
    redirect("/admin/curriculum");
  }

  async function removeSubject(formData: FormData) {
    "use server";
    await requireAdmin();
    const num = Number(formData.get("number"));
    const code = formData.get("code") as string;
    const all = await readCollection<Semester>("semesters");
    const s = all.find((x) => x.number === num);
    if (s) s.subjects = s.subjects.filter((subj) => subj.code !== code);
    await writeCollection("semesters" as Collection, all, `Remove subject ${code} from sem ${num}`);
    revalidatePath("/");
    redirect("/admin/curriculum");
  }

  async function addSemester() {
    "use server";
    await requireAdmin();
    const all = await readCollection<Semester>("semesters");
    const nextNum = all.length ? Math.max(...all.map((s) => s.number)) + 1 : 1;
    all.push({ number: nextNum, theme: "New Semester", subjects: [] });
    await writeCollection("semesters" as Collection, all, `Add semester ${nextNum}`);
    revalidatePath("/");
    redirect("/admin/curriculum");
  }

  async function removeSemester(formData: FormData) {
    "use server";
    await requireAdmin();
    const num = Number(formData.get("number"));
    const all = await readCollection<Semester>("semesters");
    await writeCollection(
      "semesters" as Collection,
      all.filter((s) => s.number !== num),
      `Delete semester ${num}`,
    );
    revalidatePath("/");
    redirect("/admin/curriculum");
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Curriculum</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Semester-wise subjects. Edit themes, add/remove subjects and semesters.
      </p>

      <form action={addSemester} className="mt-8">
        <button className="rounded-md bg-gradient-to-r from-cyan to-violet px-5 py-2 font-display text-sm font-semibold text-void">
          + Add semester
        </button>
      </form>

      <div className="mt-8 space-y-6">
        {semesters.map((s) => (
          <div key={s.number} className="rounded-lg border border-cyan/15 bg-void-2/50 p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-lg font-semibold text-cyan">
                Semester {s.number}
              </h2>
              <form action={removeSemester} className="inline">
                <input type="hidden" name="number" value={s.number} />
                <button className="font-mono text-[11px] text-rose-400/70 hover:text-rose-400">
                  delete semester
                </button>
              </form>
            </div>

            <form action={saveTheme} className="mt-3 flex gap-3">
              <input type="hidden" name="number" value={s.number} />
              <input name="theme" defaultValue={s.theme} className={inputCls} placeholder="Semester theme" />
              <button type="submit" className="shrink-0 rounded-md border border-cyan/30 px-4 py-2 font-display text-xs text-cyan hover:bg-cyan/10">
                Save theme
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {s.subjects.map((subj) => (
                <div key={subj.code} className="flex items-center gap-3 rounded-md border border-mist-faint/12 bg-void-3/40 px-3 py-2">
                  <span className="font-mono text-xs text-cyan">{subj.code}</span>
                  <span className="flex-1 font-display text-sm text-mist">{subj.title}</span>
                  <span className="font-mono text-[11px] text-mist-faint">{subj.type}</span>
                  <form action={removeSubject} className="inline">
                    <input type="hidden" name="number" value={s.number} />
                    <input type="hidden" name="code" value={subj.code} />
                    <button className="font-mono text-[11px] text-rose-400/70 hover:text-rose-400">remove</button>
                  </form>
                </div>
              ))}
            </div>

            <form action={addSubject} className="mt-4 grid gap-2 sm:grid-cols-4">
              <input type="hidden" name="number" value={s.number} />
              <input name="code" className={inputCls} placeholder="Code (e.g. AI5050)" required />
              <input name="title" className={inputCls} placeholder="Subject title" required />
              <select name="type" className={inputCls} defaultValue="Theory">
                <option value="Theory">Theory</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Project">Project</option>
              </select>
              <button type="submit" className="rounded-md border border-cyan/30 px-4 py-2 font-display text-xs text-cyan hover:bg-cyan/10">
                + Add subject
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
