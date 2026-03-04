import type { Metadata } from "next";
import "@/app/admin/styles/globalAdmin.css";

export const metadata: Metadata = {
  title: "admin",
  keywords: [
    "administracion",
  ],
  description:
    "Administrativa",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">

      <body
        className="bg-void font-sans antialiased overflow-hidden selection:bg-cyan-300 selection:text-void"
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
