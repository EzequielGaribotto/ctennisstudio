export interface Project {
  id: string;
  title: string;
  description: string;
  footer: string;
  startDate: string;
  endDate: string | null;
  image?: string; // Made optional
  images?: string[]; // Optional array for carousel
  technologies?: string[];
  repoLink?: string;
  programameLink?: string;
  arcadeLink?: string;
  playStoreLink?: string;
  presentationLink?: string;
  websiteLink?: string;
}