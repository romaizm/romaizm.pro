import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro"
  ),
  title: "Roman Izmestev — Team Lead & Full-Stack Developer",
  description:
    "Roman Izmestev is a Team Lead / CTO and full-stack developer. Leading a development team on Elixir & Phoenix LiveView, with 6+ years building websites, eCommerce stores, web apps, and mobile apps in React, Next.js, Flutter, and Shopify.",
  keywords: [
    "team lead",
    "CTO",
    "Elixir developer",
    "Phoenix LiveView",
    "web developer",
    "full-stack developer",
    "WordPress developer",
    "Shopify developer",
    "React developer",
    "Flutter developer",
    "eCommerce developer",
    "Vladivostok",
  ],
  authors: [{ name: "Roman Izmestev", url: "https://romaizm.pro" }],
  creator: "Roman Izmestev",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ru_RU",
    url: "https://romaizm.pro",
    siteName: "Roman Izmestev",
    title: "Roman Izmestev — Team Lead & Full-Stack Developer",
    description:
      "Roman Izmestev is a Team Lead / CTO and full-stack developer. Leading a development team on Elixir & Phoenix LiveView, with 6+ years building websites, eCommerce stores, web apps, and mobile apps in React, Next.js, Flutter, and Shopify.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Izmestev — Team Lead & Full-Stack Developer",
    description:
      "Roman Izmestev is a Team Lead / CTO and full-stack developer. Leading a development team on Elixir & Phoenix LiveView, with 6+ years building websites, eCommerce stores, web apps, and mobile apps in React, Next.js, Flutter, and Shopify.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
