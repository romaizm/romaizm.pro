const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro";

export function getPersonSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Roman Izmestev",
    alternateName: locale === "ru" ? "Роман Изместьев" : undefined,
    url: baseUrl,
    image: `${baseUrl}/images/roman-photo.webp`,
    jobTitle:
      locale === "ru" ? "Full-Stack Разработчик" : "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vladivostok",
      addressCountry: locale === "ru" ? "RU" : "Russia",
    },
    sameAs: ["https://github.com/romaizm", "https://t.me/romaizm"],
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "Flutter",
      "Shopify",
      "WordPress",
      "eCommerce",
      "TypeScript",
      "Node.js",
    ],
    description:
      locale === "ru"
        ? "Full-stack разработчик с 5+ лет опыта. Создаю сайты, интернет-магазины, веб-приложения и мобильные приложения для клиентов по всему миру."
        : "Full-stack developer with 5+ years of experience building websites, eCommerce stores, web apps, and mobile apps for clients worldwide.",
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Roman Izmestev",
    url: baseUrl,
    inLanguage: ["en", "ru"],
    author: {
      "@type": "Person",
      name: "Roman Izmestev",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/en/projects?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getProjectSchema(project: {
  title: string;
  description?: string;
  url?: string;
  thumbnail: string;
  date: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.url,
    image: `${baseUrl}${project.thumbnail}`,
    dateCreated: project.date,
    author: {
      "@type": "Person",
      name: "Roman Izmestev",
      url: baseUrl,
    },
    keywords: project.technologies.join(", "),
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function getFAQPageSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getWebPageSchema(options: {
  name: string;
  description: string;
  url: string;
  locale: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: `${baseUrl}${options.url}`,
    inLanguage: options.locale === "ru" ? "ru" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Roman Izmestev",
      url: baseUrl,
    },
    author: {
      "@type": "Person",
      name: "Roman Izmestev",
      url: baseUrl,
    },
    ...(options.datePublished && { datePublished: options.datePublished }),
    ...(options.dateModified && { dateModified: options.dateModified }),
  };
}
