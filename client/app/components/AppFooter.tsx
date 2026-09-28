"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "~/lib/LocaleProvider";

export default function AppFooter() {
  const pathname = usePathname();
  const { t } = useLocale();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-border">
      <div className="max-w-275 mx-auto px-10 max-md:px-5 py-8 flex flex-col md:flex-row justify-between items-center gap-2 font-mono text-xs text-muted text-center md:text-left">
        <span>
          Kasti<span className="text-cyan">dev</span> · {new Date().getFullYear()}
        </span>
        <span className="font-mono">
          {t.footer.tagline}
        </span>
      </div>
    </footer>
  );
}
