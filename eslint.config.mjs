import { default as nextConfig } from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // Allow <img> for now (separate PR to migrate to next/image)
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
