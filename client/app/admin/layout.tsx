import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./styles/dashboard.css"
import SidebarContainer from "./components/SidebarContainer";

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false;

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
  title: "Kastify - Admin",
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
        className={`${displaytype.variable} ${monotype.variable} ${bodytype.variable} bg-void font-sans antialiased overflow-hidden selection:bg-cyan-500 selection:text-void`}
      >
        <div className="flex bg-void min-h-screen overflow-hidden">
          <aside>
            <SidebarContainer />
          </aside>
          <main className="flex-1 z-10 relative">{children}</main>
        </div>
      </body>
    </html>
  );
}
