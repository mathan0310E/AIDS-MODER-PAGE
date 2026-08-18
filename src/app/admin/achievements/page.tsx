import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface Achievement {
  id: string;
  studentName: string;
  year: string;
  event: string;
  achievement: string;
  category: string;
  certificateImage?: string;
}

export default makeObjectListPage<Achievement>({
  collection: "achievements",
  title: "Achievements",
  description: "Verified student & faculty achievements — academics, hackathons, competitions and more.",
  titleField: "studentName",
  subtitleField: "event",
  fields: [
    { name: "studentName", label: "Student / faculty name", type: "text", required: true },
    { name: "year", label: "Year / class", type: "text", required: false },
    { name: "event", label: "Event / competition", type: "text", required: true, full: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "certificateImage", label: "Certificate image URL", type: "text", required: false },
    { name: "achievement", label: "Achievement", type: "textarea", required: true, full: true },
  ],
  build: (fd, id) => ({
    id,
    studentName: (fd.get("studentName") as string) || "",
    year: (fd.get("year") as string) || "",
    event: (fd.get("event") as string) || "",
    achievement: (fd.get("achievement") as string) || "",
    category: (fd.get("category") as string) || "",
    certificateImage: (fd.get("certificateImage") as string) || undefined,
  }),
});
