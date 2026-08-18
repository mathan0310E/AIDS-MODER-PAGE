import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  url?: string;
  available: boolean;
}

export default makeObjectListPage<DownloadItem>({
  collection: "downloads",
  title: "Downloads",
  description: "Official documents — syllabi, regulations, timetables, circulars and forms.",
  titleField: "title",
  subtitleField: "category",
  fields: [
    { name: "title", label: "Document title", type: "text", required: true, full: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "url", label: "File URL (leave empty = Pending)", type: "text", required: false },
  ],
  build: (fd, id) => {
    const url = (fd.get("url") as string) || "";
    return {
      id,
      title: (fd.get("title") as string) || "",
      category: (fd.get("category") as string) || "",
      url: url || undefined,
      available: Boolean(url),
    };
  },
});
