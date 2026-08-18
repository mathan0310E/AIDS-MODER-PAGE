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
  clubData,
  activityCategoriesData,
  activitiesData,
  achievementCategoriesData,
  achievementsData,
  calendarEventsData,
  galleryImagesData,
  alumniData,
  downloadsData,
  upcomingStatsData,
} from "@/data/admin-data";

const cards = [
  { key: "settings", label: "Site Settings", href: "/admin/settings", desc: "College name, department name, taglines, address, email & contact", count: 1 },
  { key: "vision", label: "Vision & Mission", href: "/admin/vision", desc: "Vision, mission & Head of Department message", count: 1 },
  { key: "faculty", label: "Faculty", href: "/admin/faculty", desc: "Names, designations, qualifications, specialisations & photos", count: facultyData.length },
  { key: "stats", label: "Hero Stats", href: "/admin/stats", desc: "Key figures shown in the hero section", count: statsData.length },
  { key: "upcomingStats", label: "Upcoming Stats", href: "/admin/upcoming-stats", desc: "Placeholder statistics awaiting verified data", count: upcomingStatsData.length },
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
  { key: "club", label: "Association (AION)", href: "/admin/club", desc: "Student association name, tagline, purpose & activities", count: clubData.length },
  { key: "activities", label: "Student Activities", href: "/admin/activities", desc: "Events, hackathons, workshops & club activities", count: activitiesData.length },
  { key: "activityCategories", label: "Activity Categories", href: "/admin/activity-categories", desc: "Activity category chips", count: activityCategoriesData.length },
  { key: "achievements", label: "Achievements", href: "/admin/achievements", desc: "Verified student & faculty achievements", count: achievementsData.length },
  { key: "achievementCategories", label: "Achievement Categories", href: "/admin/achievement-categories", desc: "Achievement category chips", count: achievementCategoriesData.length },
  { key: "calendarEvents", label: "Events Calendar", href: "/admin/events", desc: "Events on the colour-coded department calendar", count: calendarEventsData.length },
  { key: "alumni", label: "Alumni", href: "/admin/alumni", desc: "Alumni profiles, journeys & testimonials", count: alumniData.length },
  { key: "galleryImages", label: "Gallery", href: "/admin/gallery", desc: "Department photos with categories", count: galleryImagesData.length },
  { key: "downloads", label: "Downloads", href: "/admin/downloads", desc: "Syllabi, regulations, forms & documents", count: downloadsData.length },
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
