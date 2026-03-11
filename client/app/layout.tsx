import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import NavbarLayout from "@/components/UI/Navbar";
import AppFooter from "@/components/UI/AppFooter";

const displaytype = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodytype = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const monotype = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  keywords: [
    "desarrollo de aplicaciones web y móviles",
    "development of web and mobile apps",
    "desarrollador web profesional",
    "desarrollo de software a medida",
    "aplicaciones web escalables",
    "desarrollo backend y API's",
    "desarrollo frontend",
    "desarrollo de apps móviles",
  ],
  description:
    "Desarrollador especializado en aplicaciones web y móviles escalables. Diseño, desarrollo y lanzamiento de software a medida para empresas y profesionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">

      <body
        className={`${displaytype.variable} ${bodytype.variable} ${monotype.variable} antialiased `}
      >

        <NavbarLayout /> 

        <main>{children}</main>
        
        <AppFooter />
      </body>
    </html>
  );
}
