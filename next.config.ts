import type { NextConfig } from "next";

// Static export served by GitHub Pages at https://prixedox.github.io/vzdelej-se/
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vzdelej-se",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
