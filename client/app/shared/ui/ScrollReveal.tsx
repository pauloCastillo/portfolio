"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  as?: "section" | "div" | "article" | "span";
  id?: string;
}

const directionOffset = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  none: { y: 0 },
};

const easeArr = [0.25, 0.1, 0.25, 1] as const;

const motionTagMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
} as const;

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
  as: Tag = "div",
  id,
}: ScrollRevealProps) {
  const MotionTag = motionTagMap[Tag];
  const offset = directionOffset[direction];

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration, delay, ease: easeArr },
      }}
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeArr },
  },
};

export function StaggerContainer({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay, ease: easeArr },
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  className = "",
  delay = 0,
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right";
}) {
  const x = direction === "left" ? -80 : 80;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, delay, ease: easeArr },
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
