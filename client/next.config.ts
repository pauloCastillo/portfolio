import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    optimizePackageImports:["@fortawesome/free-brands-svg-icons"]
  },
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/aida-public/**",
      }
    ]
  },
};

export default nextConfig;
