import type { NextConfig } from "next";

// Las imágenes subidas viven en el backend (montadas en /public/media),
// pero el frontend las referencia con ruta relativa. Este rewrite las
// sirve a través del origen Next para que <Image> y <img> funcionen
// sin exponer el origen del backend ni necesitar remotePatterns.
const backendOrigin = (
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/api/v1/"
).replace(/\/api\/v1\/?$/, "");

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
  rewrites: async () => {
    return [
      {
        source: "/public/media/:path*",
        destination: `${backendOrigin}/public/media/:path*`,
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
