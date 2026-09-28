"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import { useLocale } from "~/lib/LocaleProvider";
import { LOCALES } from "~/lib/i18n";

export default function NavbarLayout() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");
  const blogNavItem = siteConfig.mainNav.find((n) => n.key === "blog") ?? {
    key: "blog",
    title: "Blog",
    href: "/blog",
  };
  const visibleNav = isBlog
    ? [{ key: "home", title: "Home", href: "/" } as const, blogNavItem]
    : siteConfig.mainNav;

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const sections = siteConfig.mainNav.map((n) => n.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (pathname.startsWith("/auth") || pathname.startsWith("/admin")) {
    return null;
  }

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isRoute = (href: string) => !href.startsWith("#");

  const isRouteActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-100 flex items-center justify-between px-10 max-md:px-5 py-5 border-b border-border bg-[rgba(15,17,23,0.92)] backdrop-blur-12"
    >
      <Link href="/" className="font-mono text-lg font-bold text-text no-underline shrink-0">
        Kasti<span className="text-cyan">dev</span>
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {visibleNav.map((navItem) => {
          const sectionId = navItem.href.replace("#", "");
          const isActive = isRoute(navItem.href)
            ? isRouteActive(navItem.href)
            : activeSection === sectionId;

          return (
            <li key={navItem.title} className="relative">
              {isRoute(navItem.href) ? (
                <Link
                  href={navItem.href}
                  className="relative text-sm no-underline"
                >
                  <motion.span
                    className={isActive ? "text-cyan" : "text-muted"}
                    animate={{ color: isActive ? "#22d3ee" : "#94a3b8" }}
                    transition={{ duration: 0.3 }}
                  >
                    {t.nav[navItem.key]}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-cyan"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => scrollTo(sectionId)}
                  className="relative text-sm bg-transparent border-none cursor-pointer"
                >
                  <motion.span
                    className={isActive ? "text-cyan" : "text-muted"}
                    animate={{ color: isActive ? "#22d3ee" : "#94a3b8" }}
                    transition={{ duration: 0.3 }}
                  >
                    {t.nav[navItem.key]}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-cyan"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <div
          role="group"
          aria-label={t.locale.label}
          className="hidden md:flex items-center rounded-md border border-border overflow-hidden"
        >
          {LOCALES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLocale(option)}
              aria-pressed={locale === option}
              className={`px-2.5 py-2 font-mono text-[11px] tracking-wider transition-colors cursor-pointer ${
                locale === option
                  ? "text-void bg-cyan font-bold"
                  : "text-muted hover:text-white"
              }`}
            >
              {t.locale[option]}
            </button>
          ))}
        </div>
        {isHome ? (
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contacto");
            }}
            className="font-mono text-[13px] text-cyan no-underline border border-cyan px-5 max-md:px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[rgba(34,211,238,0.1)] whitespace-nowrap"
          >
            {t.nav.cta}
          </a>
        ) : (
          <Link
            href="/#contacto"
            className="font-mono text-[13px] text-cyan no-underline border border-cyan px-5 max-md:px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[rgba(34,211,238,0.1)] whitespace-nowrap"
          >
            {t.nav.cta}
          </Link>
        )}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          aria-label={t.nav.menuLabel}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-text"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-text"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-text"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-50 bg-[rgba(15,17,23,0.98)] backdrop-blur-12 flex flex-col items-center justify-start pt-16 gap-6 md:hidden"
          >
            {visibleNav.map((navItem, i) => {
              const sectionId = navItem.href.replace("#", "");
              const isActive = isRoute(navItem.href)
                ? isRouteActive(navItem.href)
                : activeSection === sectionId;

              return (
                <motion.div
                  key={navItem.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {isRoute(navItem.href) ? (
                    <Link
                      href={navItem.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-lg no-underline ${
                        isActive ? "text-cyan" : "text-muted"
                      }`}
                    >
                      {t.nav[navItem.key]}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollTo(sectionId)}
                      className={`text-lg bg-transparent border-none cursor-pointer ${
                        isActive ? "text-cyan" : "text-muted"
                      }`}
                    >
                      {t.nav[navItem.key]}
                    </button>
                  )}
                </motion.div>
              );
            })}
            <div
              role="group"
              aria-label={t.locale.label}
              className="flex items-center gap-2 mt-4"
            >
              {LOCALES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLocale(option)}
                  aria-pressed={locale === option}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs tracking-wider border transition-colors cursor-pointer ${
                    locale === option
                      ? "text-void bg-cyan border-cyan font-bold"
                      : "text-muted border-border hover:text-white"
                  }`}
                >
                  {t.locale[option]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
