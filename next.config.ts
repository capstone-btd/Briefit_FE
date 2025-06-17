import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["briefit.s3.ap-northeast-2.amazonaws.com", "images.unsplash.com"],
  },
};

export default nextConfig;
