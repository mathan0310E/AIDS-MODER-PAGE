"use client";

import { useActionState } from "react";

interface FacultyItem {
  id?: string;
  name?: string;
  designation?: string;
  qualification?: string;
  specialization?: string[];
  email?: string;
  photo?: string;
}

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist placeholder:text-mist-faint focus:border-cyan/40 focus:outline-none";
const labelCls = "mb-1.5 block font-mono text-[11px] tracking-widest text-mist-faint uppercase";

export function FacultyForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: FacultyItem;
}) {
  const [state, formAction] = useActionState(async (_prev: unknown, formData: FormData) => {
    try {
      await action(formData);
      return undefined;
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Something went wrong" };
    }
  }, undefined);
  return (
    <form action={formAction} className="mt-4 grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <input type="hidden" name="existingPhoto" value={item?.photo ?? ""} />

      <div>
        <label className={labelCls}>Name</label>
        <input name="name" defaultValue={item?.name ?? ""} className={inputCls} placeholder="Dr. Jane Doe" required />
      </div>
      <div>
        <label className={labelCls}>Designation</label>
        <input name="designation" defaultValue={item?.designation ?? ""} className={inputCls} placeholder="Assistant Professor" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Qualification</label>
        <input name="qualification" defaultValue={item?.qualification ?? ""} className={inputCls} placeholder="Ph.D (Machine Learning), Anna University" />
      </div>
      <div>
        <label className={labelCls}>Specialisations (comma-separated)</label>
        <input name="specialization" defaultValue={(item?.specialization ?? []).join(", ")} className={inputCls} placeholder="Machine Learning, Computer Vision" />
      </div>
      <div>
        <label className={labelCls}>Email</label>
        <input name="email" type="email" defaultValue={item?.email ?? ""} className={inputCls} placeholder="name@skpec.edu.in" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Photo (optional)</label>
        <input name="photo" type="file" accept="image/*" className="block w-full text-sm text-mist-soft file:mr-3 file:rounded-md file:border file:border-cyan/30 file:bg-cyan/10 file:px-4 file:py-2 file:text-cyan" />
        {item?.photo && (
          <p className="mt-2 font-mono text-[11px] text-mist-faint">Current: {item.photo}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-cyan to-violet px-6 py-2.5 font-display text-sm font-semibold text-void hover:shadow-[0_0_20px_rgba(0,229,255,0.35)]"
        >
          {item?.id ? "Save changes" : "Add faculty"}
        </button>
        {state?.error && (
          <p className="mt-3 font-mono text-xs text-rose-400">{state.error}</p>
        )}
      </div>
    </form>
  );
}
