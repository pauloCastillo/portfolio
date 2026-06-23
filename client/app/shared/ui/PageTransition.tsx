"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const pageVariants = {
  hidden: { opacity: 0, filter: "blur(4px)", scale: 0.98 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.45,
      ease,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="will-change-transform will-change-opacity"
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
