/**
 * Re-exports all content collections for the admin dashboard.
 * Components should import from @/data/department.ts instead —
 * this barrel file exists solely for admin page item counts.
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
import facultyData from "@/data/content/faculty.json";
import newsData from "@/data/content/news.json";
import projectsData from "@/data/content/projects.json";
import announcementsData from "@/data/content/announcements.json";

export {
  siteData,
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
  facultyData,
  newsData,
  projectsData,
  announcementsData,
};
