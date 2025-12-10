export interface Project {
  slug: string;
  title: string;
  client: string;
  clientLocation: string;
  date: string;
  launchDate: string;
  platform: "Shopify" | "WooCommerce" | "WordPress" | "Ecwid" | "Flutter" | "React" | "Custom";
  category: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  url?: string;
  featured: boolean;
  services: string[];
  content: string;
  description?: string;
}

export interface ProjectFrontmatter {
  title: string;
  client: string;
  clientLocation: string;
  date: string;
  launchDate: string;
  platform: Project["platform"];
  category: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  url?: string;
  featured: boolean;
  services: string[];
  description?: string;
}
