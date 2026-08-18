import Link from "next/link";
import {
  facultyData,
  newsData,
  projectsData,
  announcementsData,
  statsData,
  whyCardsData,
  semestersData,
  laboratoriesData,
  researchAreasData,
  careerOpportunitiesData,
  placementSupportData,
  studentResourcesData,
  faqsData,
  academicDocumentsData,
} from "@/data/admin-data";

const cards = [
  { key: "settings", label: "Site Settings", href: "/admin/settings", desc: "College name, department name, taglines, address, email & contact", count: 1 },
  { key: "faculty", label: "Faculty", href: "/admin/faculty", desc: "Names, designations, qualifications, specialisations & photos", count: facultyData.length },
  { key: "stats", label: "Hero Stats", href: "/admin/stats", desc: "Key figures shown in the hero section", count: statsData.length },
  { key: "whyCards", label: "Why AI & DS Cards", href: "/admin/why-cards", desc: "Discipline cards in the Why AI & DS section", count: whyCardsData.length },
  { key: "semesters", label: "Curriculum", href: "/admin/curriculum", desc: "Semester-wise subjects & themes", count: semestersData.length },
  { key: "laboratories", label: "Laboratories", href: "/admin/labs", desc: "Labs with equipment & software lists", count: laboratoriesData.length },
  { key: "researchAreas", label: "Research Areas", href: "/admin/research-areas", desc: "Domain tags shown across the site", count: researchAreasData.length },
  { key: "careerOpportunities", label: "Career Opportunities", href: "/admin/careers", desc: "Job roles in the Careers section", count: careerOpportunitiesData.length },
  { key: "placementSupport", label: "Placement Support", href: "/admin/placement", desc: "Placement & internship support cards", count: placementSupportData.length },
  { key: "studentResources", label: "Student Resources", href: "/admin/resources", desc: "External learning resource links", count: studentResourcesData.length },
  { key: "news", label: "News", href: "/admin/news", desc: "Department news & academic announcements", count: newsData.length },
  { key: "projects", label: "Student Projects", href: "/admin/projects", desc: "Showcase projects with categories & technologies", count: projectsData.length },
  { key: "announcements", label: "Announcements", href: "/admin/announcements", desc: "Short notice ticker shown on the news section", count: announcementsData.length },
  { key: "faqs", label: "FAQs", href: "/admin/faqs", desc: "Frequently asked questions", count: faqsData.length },
  { key: "academicDocuments", label: "Academic Documents", href: "/admin/academic-docs", desc: "Document types listed in curriculum section", count: academicDocumentsData.length },
] as const;

export default async function AdminDashboard() {
  return (
    <>
      <h1 className="font-display text-3xl font-bold text-mist">Dashboard</h1>
      <p className="mt-2 font-display text-sm text-mist-soft">
        Manage every piece of live website content. Changes save to the
        repository and rebuild the site automatically.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.key} href={c.href} className="card-accent group rounded-lg p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg font-semibold text-mist group-hover:text-cyan">
                {c.label}
              </span>
              <span className="font-mono text-3xl font-bold text-cyan">{c.count}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist-soft">{c.desc}</p>
            <span className="mt-4 inline-block font-mono text-xs text-cyan">manage →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
