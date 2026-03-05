import type { Metadata } from "next";
import "@/app/admin/styles/globalAdmin.css";
import { Inter, JetBrains_Mono } from "next/font/google";

const bodytype = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const monotype = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Admin",
  keywords: ["administracion"],
  description: "Administrativa",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${monotype.variable} ${bodytype.variable} bg-void font-sans antialiased overflow-hidden selection:bg-cyan-300 selection:text-void`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
