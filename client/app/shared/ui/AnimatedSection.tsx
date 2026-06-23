"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  as?: "section" | "div";
  id?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function AnimatedSection({
  children,
  className = "",
  stagger = false,
  delay = 0,
  as: Tag = "section",
  id,
}: AnimatedSectionProps) {
  const MotionTag = motion.create(Tag);

  if (stagger) {
    return (
      <MotionTag
        id={id}
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}

export const MotionDiv = motion.div;
export { staggerVariants, containerVariants };
