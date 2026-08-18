import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface Activity {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  category: string;
  photos: string[];
  registrationUrl?: string;
}

export default makeObjectListPage<Activity>({
  collection: "activities",
  title: "Student Activities",
  description: "Technical events, hackathons, workshops, seminars, industrial visits and club activities.",
  titleField: "name",
  subtitleField: "date",
  fields: [
    { name: "name", label: "Event name", type: "text", required: true, full: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "location", label: "Location", type: "text", required: false },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "registrationUrl", label: "Registration URL", type: "text", required: false },
    { name: "description", label: "Description", type: "textarea", required: true, full: true },
  ],
  build: (fd, id) => ({
    id,
    name: (fd.get("name") as string) || "",
    date: (fd.get("date") as string) || "",
    location: (fd.get("location") as string) || "",
    description: (fd.get("description") as string) || "",
    category: (fd.get("category") as string) || "",
    photos: [],
    registrationUrl: (fd.get("registrationUrl") as string) || undefined,
  }),
});
