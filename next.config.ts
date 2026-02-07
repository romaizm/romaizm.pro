import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["framer-motion", "@tabler/icons-react"],
  },
};

export default withNextIntl(nextConfig);
