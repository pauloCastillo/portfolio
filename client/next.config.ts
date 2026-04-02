import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
  experimental:{
    optimizePackageImports:["@fortawesome/free-brands-svg-icons"],
    proxyClientMaxBodySize: "1mb",
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
