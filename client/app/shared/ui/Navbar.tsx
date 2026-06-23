"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

export default function NavbarLayout() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  // useEffect(() => {
  //   setMobileOpen(false);
  // }, [pathname]);

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

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-100 flex items-center justify-between px-10 max-md:px-5 py-5 border-b border-border bg-[rgba(15,17,23,0.92)] backdrop-blur-12"
    >
      <button onClick={() => scrollTo("heroe")} className="font-mono text-lg font-bold text-text no-underline shrink-0 bg-transparent border-none cursor-pointer">
        Kasti<span className="text-cyan">dev</span>
      </button>

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {siteConfig.mainNav.map((navItem) => {
          const sectionId = navItem.href.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <li key={navItem.title} className="relative">
              <button
                onClick={() => scrollTo(sectionId)}
                className="relative text-sm bg-transparent border-none cursor-pointer"
              >
                <motion.span
                  className={isActive ? "text-cyan" : "text-muted"}
                  animate={{ color: isActive ? "#22d3ee" : "#94a3b8" }}
                  transition={{ duration: 0.3 }}
                >
                  {navItem.title}
                </motion.span>
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-cyan"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <a
          href="#contacto"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("contacto");
          }}
          className="font-mono text-[13px] text-cyan no-underline border border-cyan px-5 max-md:px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[rgba(34,211,238,0.1)] whitespace-nowrap"
        >
          Hablemos →
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          aria-label="Toggle navigation menu"
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
            {siteConfig.mainNav.map((navItem, i) => {
              const sectionId = navItem.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <motion.div
                  key={navItem.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => scrollTo(sectionId)}
                    className={`text-lg bg-transparent border-none cursor-pointer ${
                      isActive ? "text-cyan" : "text-muted"
                    }`}
                  >
                    {navItem.title}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
