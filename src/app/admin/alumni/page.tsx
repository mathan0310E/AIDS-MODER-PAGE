import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: string;
  company: string;
  role: string;
  journey: string;
  testimonial: string;
  photo?: string;
}

export default makeObjectListPage<AlumniProfile>({
  collection: "alumni",
  title: "Alumni",
  description: "Alumni profiles, career journeys and testimonials.",
  titleField: "name",
  subtitleField: "graduationYear",
  fields: [
    { name: "name", label: "Full name", type: "text", required: true },
    { name: "graduationYear", label: "Graduation year", type: "text", required: true },
    { name: "role", label: "Current role", type: "text", required: false },
    { name: "company", label: "Company", type: "text", required: false },
    { name: "photo", label: "Photo URL", type: "text", required: false },
    { name: "journey", label: "Career journey", type: "textarea", required: false, full: true },
    { name: "testimonial", label: "Testimonial", type: "textarea", required: false, full: true },
  ],
  build: (fd, id) => ({
    id,
    name: (fd.get("name") as string) || "",
    graduationYear: (fd.get("graduationYear") as string) || "",
    company: (fd.get("company") as string) || "",
    role: (fd.get("role") as string) || "",
    journey: (fd.get("journey") as string) || "",
    testimonial: (fd.get("testimonial") as string) || "",
    photo: (fd.get("photo") as string) || undefined,
  }),
});
