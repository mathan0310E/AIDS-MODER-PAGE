/**
 * Department content layer — all editable content lives in
 * src/data/content/*.json and is managed through the /admin panel.
 */

import siteData from "@/data/content/site.json";
import statsData from "@/data/content/stats.json";
import whyCardsData from "@/data/content/whyCards.json";
import semestersData from "@/data/content/semesters.json";
import laboratoriesData from "@/data/content/laboratories.json";
import researchAreasData from "@/data/content/researchAreas.json";
import careerOpportunitiesData from "@/data/content/careerOpportunities.json";
import placementSupportData from "@/data/content/placementSupport.json";
import studentResourcesData from "@/data/content/studentResources.json";
import faqsData from "@/data/content/faqs.json";
import academicDocumentsData from "@/data/content/academicDocuments.json";
import newsData from "@/data/content/news.json";
import projectsData from "@/data/content/projects.json";
import announcementsData from "@/data/content/announcements.json";
import facultyData from "@/data/content/faculty.json";

export const site = {
  ...(siteData as Record<string, unknown>),
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://aids.skpec.edu.in",
} as typeof siteData & { siteUrl: string };

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Labs", href: "#labs" },
  { label: "Projects", href: "#projects" },
  { label: "Careers", href: "#careers" },
  { label: "Faculty", href: "#faculty" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const PLACEHOLDER_NOTE = "Information will be updated by the department.";

/* --------------------------------- Stats ---------------------------------- */

export interface Stat {
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  provenance?: string;
}

export const stats: Stat[] = statsData as Stat[];

/* --------------------------------- Why AI&DS ------------------------------ */

export interface WhyCard {
  title: string;
  description: string;
  icon: "brain" | "network" | "chart" | "layers" | "analytics" | "spark";
}

export const whyCards: WhyCard[] = whyCardsData as WhyCard[];

/* ------------------------------- Curriculum ------------------------------- */

export interface CurriculumSubject {
  code: string;
  title: string;
  type: "Theory" | "Laboratory" | "Project";
}

export interface Semester {
  number: number;
  theme: string;
  subjects: CurriculumSubject[];
}

/** Foundation subjects common across Anna University B.Tech programmes. */
export const semesters: Semester[] = semestersData as Semester[];

export const academicDocuments: string[] =
  academicDocumentsData as string[];

/* ------------------------------- Laboratories ----------------------------- */

export interface Laboratory {
  id: string;
  name: string;
  focus: string;
  equipment: string[];
  software: string[];
}

export const laboratories: Laboratory[] = laboratoriesData as Laboratory[];

/* ------------------------------- Student Projects ------------------------- */

export interface StudentProject {
  id: string;
  title: string;
  category: string;
  blurb: string;
  technologies: string[];
  status: "Ongoing" | "Completed" | "Recruiting";
}

export const studentProjects: StudentProject[] =
  projectsData as StudentProject[];

/* ------------------------------- Research areas --------------------------- */

export const researchAreas: string[] = researchAreasData as string[];

/* ------------------------------ Career pathways --------------------------- */

export const careerOpportunities: string[] =
  careerOpportunitiesData as string[];

export const placementSupport = placementSupportData as {
  title: string;
  description: string;
}[];

/* ------------------------------- Resources -------------------------------- */

export interface StudentResource {
  name: string;
  url: string;
  description: string;
}

export const studentResources: StudentResource[] =
  studentResourcesData as StudentResource[];

/* ----------------------------------- News --------------------------------- */

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
}

export const news: NewsItem[] = newsData as NewsItem[];

export const announcements: string[] = announcementsData as string[];

/* ---------------------------------- FAQ ----------------------------------- */

export const faqs = faqsData as { q: string; a: string }[];

/* --------------------------------- Faculty -------------------------------- */

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string[];
  email: string;
  photo?: string;
}

/** Faculty is admin-editable (stored in src/data/content/faculty.json). */
export const faculty: FacultyMember[] = facultyData as FacultyMember[];
