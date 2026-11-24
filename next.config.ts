import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The portfolio would rather ship a slightly heavier file than a soft one,
    // so the higher qualities are opted in (75 is the Next default).
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
