import Link from "next/link";
import { facultyData, newsData, projectsData, announcementsData } from "@/data/admin-data";

const cards = [
  { key: "faculty", label: "Faculty members", href: "/admin/faculty", desc: "Names, designations, qualifications, specialisations & photos" },
  { key: "news", label: "News items", href: "/admin/news", desc: "Department news, admissions & academic announcements" },
  { key: "projects", label: "Student projects", href: "/admin/projects", desc: "Showcase projects with categories & technologies" },
  { key: "announcements", label: "Announcements", href: "/admin/announcements", desc: "Short notice ticker shown on the news section" },
] as const;

export default async function AdminDashboard() {
  const counts: Record<string, number> = {
    faculty: facultyData.length,
    news: newsData.length,
    projects: projectsData.length,
    announcements: announcementsData.length,
  };

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Dashboard</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Manage the live website content. Changes save to the repository and
        rebuild the site automatically.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="card-accent group rounded-lg p-6"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg font-semibold text-mist group-hover:text-cyan">
                {c.label}
              </span>
              <span className="font-mono text-3xl font-bold text-cyan">
                {counts[c.key]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist-soft">
              {c.desc}
            </p>
            <span className="mt-4 inline-block font-mono text-xs text-cyan">
              manage →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
