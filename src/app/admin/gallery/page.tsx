import { makeObjectListPage } from "@/components/admin/ObjectListPage";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export default makeObjectListPage<GalleryImage>({
  collection: "galleryImages",
  title: "Gallery",
  description: "Photos shown in the department gallery — campus, labs, events and more.",
  titleField: "alt",
  subtitleField: "category",
  fields: [
    { name: "src", label: "Image URL", type: "text", required: true, full: true },
    { name: "alt", label: "Caption / alt text", type: "text", required: true, full: true },
    { name: "category", label: "Category", type: "text", required: true },
  ],
  build: (fd, id) => ({
    id,
    src: (fd.get("src") as string) || "",
    alt: (fd.get("alt") as string) || "",
    category: (fd.get("category") as string) || "",
  }),
});
