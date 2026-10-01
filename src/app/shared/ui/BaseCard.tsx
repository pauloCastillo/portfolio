"use client";
import Link from "next/link";
import { IconDashboard, IconMobile, IconApi } from "./icons";
import { MotionDiv, staggerVariants } from "./AnimatedSection";

interface BaseCardProps {
  project: {
    id: number;
    imageUrl: string;
    name: string;
    description: string;
    stack: string[];
  };
  index: number;
}

const projectIcons = [<IconDashboard key="d" />, <IconMobile key="m" />, <IconApi key="a" />];

export default function BaseCard({ project, index }: Readonly<BaseCardProps>) {
  const isFeatured = index === 0;
  const externalLink = isFeatured ? "ver proyecto ↗" : "GitHub ↗";

  return (
    <MotionDiv
      variants={staggerVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-surface border rounded-xl p-7 flex flex-col gap-3 transition-colors duration-250 hover:border-[rgba(34,211,238,0.35)] ${
        isFeatured
          ? "border-[rgba(34,211,238,0.25)] col-span-1 md:col-span-2"
          : "border-border"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="text-2xl text-cyan">{projectIcons[index % projectIcons.length]}</div>
        <Link href="#" className="font-mono text-xs text-muted no-underline hover:text-cyan">
          {externalLink}
        </Link>
      </div>
      <div className="text-[17px] font-semibold text-text">{project.name}</div>
      <p className="text-sm text-muted leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] text-indigo bg-[rgba(99,102,241,0.1)] px-[10px] py-[3px] rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </MotionDiv>
  );
}
