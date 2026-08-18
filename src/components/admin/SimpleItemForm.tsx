"use client";

import { useActionState } from "react";

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "date" | "textarea" | "number" | "email";
  required?: boolean;
  full?: boolean;
}

const inputCls =
  "w-full rounded-md border border-mist-faint/20 bg-void-3/60 px-3 py-2 font-display text-sm text-mist placeholder:text-mist-faint focus:border-cyan/40 focus:outline-none";
const labelCls = "mb-1.5 block font-mono text-[11px] tracking-widest text-mist-faint uppercase";

export function SimpleItemForm({
  action,
  fields,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  fields: readonly FieldDef[];
  item?: Record<string, unknown>;
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
      <input type="hidden" name="id" value={(item?.id as string) ?? ""} />
      {fields.map((f) => (
        <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
          <label className={labelCls}>{f.label}</label>
          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              defaultValue={(item?.[f.name] as string) ?? ""}
              rows={3}
              className={inputCls}
              required={f.required}
              placeholder={f.label}
            />
          ) : (
            <input
              name={f.name}
              type={f.type === "number" ? "number" : f.type}
              defaultValue={
                item?.[f.name] !== undefined && item?.[f.name] !== null
                  ? String(item?.[f.name])
                  : ""
              }
              className={inputCls}
              required={f.required}
              placeholder={f.label}
            />
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-cyan to-violet px-6 py-2.5 font-display text-sm font-semibold text-void hover:shadow-[0_0_20px_rgba(0,229,255,0.35)]"
        >
          {item?.id ? "Save changes" : "Add"}
        </button>
        {state?.error && (
          <p className="mt-3 font-mono text-xs text-rose-400">{state.error}</p>
        )}
      </div>
    </form>
  );
}
