import type { Metadata } from "next";
import "./styles/dashboard.css"
import SidebarContainer from "./shared/components/SidebarContainer";

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false;

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
    <div className="flex bg-void min-h-screen overflow-hidden">
      <aside>
        <SidebarContainer />
      </aside>
      <main className="flex-1 z-10 relative">{children}</main>
    </div>
  );
}
