import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // MSME Builder was renamed Vina; keep shared links working.
    return [{ source: "/work/msme-builder", destination: "/work/vina", permanent: true }];
  },
};

export default nextConfig;
