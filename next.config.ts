import type { NextConfig } from "next";

/** Case studies taken off the site; old links land on the home page instead of a 404. */
const removed = ["weekday-desk", "phishshield", "turbonites-ev", "glaucoma-monitor", "karuvelam", "jalodayam", "trident3d", "ride-hailing-device"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // MSME Builder was renamed Vina; keep shared links working.
      { source: "/work/msme-builder", destination: "/work/vina", permanent: true },
      ...removed.map((slug) => ({ source: `/work/${slug}`, destination: "/#projects", permanent: false })),
    ];
  },
};

export default nextConfig;
