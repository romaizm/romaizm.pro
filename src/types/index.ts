export * from "./project";

export type Locale = "en" | "ru";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  price: string;
  features: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface WorkExperience {
  id: string;
  company: string;
  companySlug: string;
  title: string;
  period: string;
  description: string[];
  mainSkills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  type?: "formal" | "self-study";
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
