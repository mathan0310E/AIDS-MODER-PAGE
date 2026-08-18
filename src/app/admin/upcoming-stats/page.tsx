import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface Stat {
  id: string;
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  provenance?: string;
}

export default makeObjectListPage<Stat>({
  collection: "upcomingStats",
  title: "Upcoming Stats",
  description: "Placeholder statistics awaiting verified department data.",
  titleField: "label",
  subtitleField: "value",
  fields: [
    { name: "label", label: "Label", type: "text", required: true },
    { name: "value", label: "Value (text, e.g. —)", type: "text", required: true },
    { name: "numericValue", label: "Numeric value (for counters)", type: "number", required: false },
    { name: "suffix", label: "Suffix (e.g. +, %)", type: "text", required: false },
    { name: "provenance", label: "Provenance note", type: "text", required: false, full: true },
  ],
  build: (fd, id) => {
    const num = (fd.get("numericValue") as string) || "";
    return {
      id,
      label: (fd.get("label") as string) || "",
      value: (fd.get("value") as string) || "",
      numericValue: num ? Number(num) : undefined,
      suffix: (fd.get("suffix") as string) || undefined,
      provenance: (fd.get("provenance") as string) || undefined,
    };
  },
});
