export interface Training {
  id: string;
  institution: string;
  course: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  institutionUrl?: string;
}
