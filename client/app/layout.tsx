import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

import NavbarLayout from "@/shared/ui/Navbar";
import AppFooter from "@/components/AppFooter";

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { StoreProvider } from "~/store/provider";

config.autoAddCss = false;

const mono = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodytype = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kastify",
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
        className={`${mono.variable} ${bodytype.variable} antialiased text-base font-body bg-void text-text`}
      >
        <StoreProvider>
          <NavbarLayout />
          <main>{children}</main>
          <AppFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
