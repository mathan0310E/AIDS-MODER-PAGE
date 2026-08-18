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
import clubData from "@/data/content/club.json";
import activityCategoriesData from "@/data/content/activityCategories.json";
import activitiesData from "@/data/content/activities.json";
import achievementCategoriesData from "@/data/content/achievementCategories.json";
import achievementsData from "@/data/content/achievements.json";
import calendarCategoriesData from "@/data/content/calendarCategories.json";
import calendarEventsData from "@/data/content/calendarEvents.json";
import galleryCategoriesData from "@/data/content/galleryCategories.json";
import galleryImagesData from "@/data/content/galleryImages.json";
import alumniData from "@/data/content/alumni.json";
import downloadCategoriesData from "@/data/content/downloadCategories.json";
import downloadsData from "@/data/content/downloads.json";
import upcomingStatsData from "@/data/content/upcomingStats.json";
import visionData from "@/data/content/vision.json";

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
  { label: "Activities", href: "#activities" },
  { label: "Achievements", href: "#achievements" },
  { label: "Events", href: "#events" },
  { label: "Careers", href: "#careers" },
  { label: "Faculty", href: "#faculty" },
  { label: "Alumni", href: "#alumni" },
  { label: "Gallery", href: "#gallery" },
  { label: "Downloads", href: "#downloads" },
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

/* ----------------------------- Student Activities ------------------------- */

export const activityCategories: string[] =
  activityCategoriesData as string[];

export interface Activity {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  category: string;
  photos: string[];
  registrationUrl?: string;
}

export const activities: Activity[] = activitiesData as Activity[];

export interface Club {
  name: string;
  purpose: string;
  tagline?: string;
  features: string[];
}

export const club: Club = (clubData as Club[])[0];

/* ------------------------------- Achievements ----------------------------- */

export const achievementCategories: string[] =
  achievementCategoriesData as string[];

export interface Achievement {
  id: string;
  studentName: string;
  year: string;
  event: string;
  achievement: string;
  category: string;
  certificateImage?: string;
}

export const achievements: Achievement[] = achievementsData as Achievement[];

/* ----------------------------- Events Calendar ---------------------------- */

export const calendarCategories: string[] =
  calendarCategoriesData as string[];

export const calendarCategoryColors: Record<string, string> = {
  Workshop: "bg-cyan",
  Seminar: "bg-violet",
  Hackathon: "bg-magenta-bright",
  Exam: "bg-rose-500",
  Competition: "bg-amber-500",
  "Guest Lecture": "bg-lime",
  "Department Event": "bg-cyan-bright",
};

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
}

export const calendarEvents: CalendarEvent[] =
  calendarEventsData as CalendarEvent[];

/* --------------------------------- Gallery -------------------------------- */

export const galleryCategories: string[] =
  galleryCategoriesData as string[];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export const galleryImages: GalleryImage[] =
  galleryImagesData as GalleryImage[];

/* --------------------------------- Alumni --------------------------------- */

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: string;
  company: string;
  role: string;
  journey: string;
  testimonial: string;
  photo?: string;
}

export const alumni: AlumniProfile[] = alumniData as AlumniProfile[];

/* -------------------------------- Downloads ------------------------------- */

export const downloadCategories: string[] =
  downloadCategoriesData as string[];

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  url?: string;
  available: boolean;
}

export const downloads: DownloadItem[] = downloadsData as DownloadItem[];

/* --------------------------- Upcoming / placeholder stats ----------------- */

export const upcomingStats: Stat[] = upcomingStatsData as Stat[];

/* ------------------------------- Vision ----------------------------------- */

export const vision = visionData as {
  vision: string;
  mission: string;
  hodMessage: string;
};
