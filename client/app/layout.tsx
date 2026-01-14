import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarLayout from "@/components/UI/Navbar";
import AppFooter from "@/components/UI/AppFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarLayout />
        <main>{children}</main>
        <footer className="bg-teal-500 p-2.5">
          <AppFooter />
        </footer>
      </body>
    </html>
  );
}
