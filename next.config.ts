import type { NextConfig } from "next";

/** Dépôt GitHub Pages : https://jason54jg.github.io/CapoPizza/ */
const GITHUB_PAGES = process.env.GITHUB_PAGES === "true";
const REPO_NAME = "CapoPizza";
const basePath = GITHUB_PAGES ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: GITHUB_PAGES ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
