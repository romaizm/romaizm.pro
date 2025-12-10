import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://romaizm.pro"
  ),
  title: {
    default: "Roman Izmestev - Full-Stack Developer",
    template: "%s | Roman Izmestev",
  },
  description:
    "Full-Stack Developer specializing in WordPress, Shopify, React, and Flutter. Building digital solutions that drive results.",
  keywords: [
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
    title: "Roman Izmestev - Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in WordPress, Shopify, React, and Flutter.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Izmestev - Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in WordPress, Shopify, React, and Flutter.",
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
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
