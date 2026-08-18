import { requireAdmin } from "@/auth";
import { readSetting, writeSetting, type Collection } from "@/lib/content-store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { siteData } from "@/data/admin-data";

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist focus:border-cyan/40 focus:outline-none";
const labelCls =
  "mb-1.5 block font-mono text-[11px] tracking-widest text-mist-faint uppercase";

export default async function SettingsAdminPage() {
  await requireAdmin();
  const site = await readSetting<Record<string, unknown>>("site");

  async function save(formData: FormData) {
    "use server";
    await requireAdmin();
    const get = (k: string) => (formData.get(k) as string) || "";
    const num = (k: string) => {
      const v = get(k);
      return v ? Number(v) : undefined;
    };
    const value = {
      collegeName: get("collegeName"),
      collegeNameUpper: get("collegeNameUpper"),
      trust: get("trust"),
      departmentName: get("departmentName"),
      departmentShort: get("departmentShort"),
      departmentCode: get("departmentCode"),
      tagline: get("tagline"),
      heroTagline: get("heroTagline"),
      approvedBy: get("approvedBy"),
      affiliatedTo: get("affiliatedTo"),
      collegeEstablished: num("collegeEstablished"),
      programEstablished: get("programEstablished"),
      initialIntake: num("initialIntake"),
      address: {
        line1: get("address.line1"),
        line2: get("address.line2"),
        line3: get("address.line3"),
      },
      collegeWebsite: get("collegeWebsite"),
      departmentEmail: get("departmentEmail"),
      mapsQuery: get("mapsQuery"),
    };
    await writeSetting("site" as Collection, value, "Update site settings");
    revalidatePath("/");
    redirect("/admin/settings");
  }

  const s = (site as typeof siteData) ?? siteData;
  const get = (k: keyof typeof siteData) => (s[k] as string) ?? "";

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Site Settings</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        College &amp; department identity, contact details and hero copy shown across the site.
      </p>

      <form action={save} className="mt-8 grid gap-5 rounded-lg border border-cyan/15 bg-void-2/50 p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>College name</label>
          <input name="collegeName" defaultValue={get("collegeName")} className={inputCls} required />
        </div>
        <div>
          <label className={labelCls}>College name (upper)</label>
          <input name="collegeNameUpper" defaultValue={get("collegeNameUpper")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Trust</label>
          <input name="trust" defaultValue={get("trust")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Department name (full)</label>
          <input name="departmentName" defaultValue={get("departmentName")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Department short</label>
          <input name="departmentShort" defaultValue={get("departmentShort")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Department code</label>
          <input name="departmentCode" defaultValue={get("departmentCode")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Tagline</label>
          <input name="tagline" defaultValue={get("tagline")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Hero tagline</label>
          <textarea name="heroTagline" defaultValue={get("heroTagline")} rows={2} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Approved by</label>
          <input name="approvedBy" defaultValue={get("approvedBy")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Affiliated to</label>
          <input name="affiliatedTo" defaultValue={get("affiliatedTo")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>College established (year)</label>
          <input name="collegeEstablished" type="number" defaultValue={String(s.collegeEstablished ?? "")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Program established</label>
          <input name="programEstablished" defaultValue={get("programEstablished")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Initial intake</label>
          <input name="initialIntake" type="number" defaultValue={String(s.initialIntake ?? "")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Department email</label>
          <input name="departmentEmail" type="email" defaultValue={get("departmentEmail")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>College website</label>
          <input name="collegeWebsite" defaultValue={get("collegeWebsite")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address line 1</label>
          <input name="address.line1" defaultValue={s.address?.line1 ?? ""} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address line 2</label>
          <input name="address.line2" defaultValue={s.address?.line2 ?? ""} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Address line 3</label>
          <input name="address.line3" defaultValue={s.address?.line3 ?? ""} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Google Maps query</label>
          <input name="mapsQuery" defaultValue={get("mapsQuery")} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="rounded-md bg-gradient-to-r from-cyan to-violet px-6 py-2.5 font-display text-sm font-semibold text-void hover:shadow-[0_0_20px_rgba(0,229,255,0.35)]">
            Save settings
          </button>
        </div>
      </form>
    </>
  );
}
