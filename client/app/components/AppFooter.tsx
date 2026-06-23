"use client";

import { usePathname } from "next/navigation";

export default function AppFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-border">
      <div className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-8 flex flex-col md:flex-row justify-between items-center gap-2 font-mono text-xs text-muted text-center md:text-left">
        <span>
          Kasti<span className="text-cyan">dev</span> · 2025
        </span>
        <span className="font-mono">
          // Escribo código limpio, construyo ideas reales.
        </span>
      </div>
    </footer>
  );
}
