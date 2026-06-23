"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

export default function NavbarLayout() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-100 flex items-center justify-between px-10 py-5 border-b border-border bg-[rgba(15,17,23,0.92)] backdrop-blur-12">
      <Link href="/" className="font-mono text-lg font-bold text-text no-underline">
        Kasti<span className="text-cyan">dev</span>
      </Link>
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {siteConfig.mainNav.map((navItem) => (
          <li key={navItem.title}>
            <Link
              href={navItem.href}
              className="text-sm text-muted no-underline transition-colors duration-200 hover:text-cyan"
            >
              {navItem.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="#contacto"
        className="font-mono text-[13px] text-cyan no-underline border border-cyan px-16 py-2 rounded-md transition-colors duration-200 hover:bg-[rgba(34,211,238,0.1)]"
      >
        Hablemos →
      </Link>
    </nav>
  );
}
