import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
}

export default makeObjectListPage<CalendarEvent>({
  collection: "calendarEvents",
  title: "Events Calendar",
  description: "Events shown on the department calendar — colour-coded by category.",
  titleField: "title",
  subtitleField: "date",
  fields: [
    { name: "title", label: "Event title", type: "text", required: true, full: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: false, full: true },
  ],
  build: (fd, id) => ({
    id,
    title: (fd.get("title") as string) || "",
    date: (fd.get("date") as string) || "",
    category: (fd.get("category") as string) || "",
    description: (fd.get("description") as string) || "",
  }),
});
