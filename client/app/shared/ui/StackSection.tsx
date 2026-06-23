"use client";
import SectionHeading from "./SectionHeading";
import AnimatedSection, { MotionDiv, staggerVariants } from "./AnimatedSection";
import {
  faHtml5,
  faCss3,
  faJs,
  faSass,
  faReact,
  faVuejs,
  faPython,
  faDocker,
  faGit,
  faFigma,
  faGithub,
  faTailwindCss,
  faTypescript,
  faNode,
  faPostgresql,
  faAndroid,
  faClaude,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const skills = [
  { name: "Html5", variant:"primary", icon: faHtml5 },
  { name: "Css3", variant: "primary", icon: faCss3 },
  { name: "Sass", variant: "primary", icon: faSass },
  { name: "Tailwindcss", variant: "primary", icon: faTailwindCss },
  { name: "JavaScript", variant: "primary", icon: faJs },
  { name: "TypeScript", variant: "primary", icon: faTypescript },
  { name: "React", variant: "primary", icon: faReact },
  { name: "Next.js", variant: "primary" },
  { name: "Node.js", variant: "primary", icon: faNode },
  { name: "Express.js", variant: "primary" },
  { name: "Nest.js", variant: "secondary" },
  { name: "Vue", variant: "primary", icon: faVuejs },
  { name: "Nuxt.js", variant: "primary"},
  { name: "Python", variant: "primary", icon: faPython },
  { name: "React Native", variant: "secondary"},
  { name: "Android", variant: "secondary", icon: faAndroid },
  { name: "PostgreSQL", variant: "default", icon: faPostgresql },
  { name: "MySQL", variant: "default", },
  { name: "MongoDB", variant: "default", },
  { name: "REST APIs", variant: "default"},
  { name: "Git", variant: "default", icon: faGit },
  { name: "Github", variant: "default", icon: faGithub },
  { name: "Figma", variant: "default", icon: faFigma },
  { name: "Docker", variant: "default", icon: faDocker },
  { name: "Open Source", variant: "default" },
  { name: "AI + Claude", variant: "default", icon: faClaude },
];

export default function StackSection() {
  const pillStyle = (variant: string) => {
    const base = "font-mono text-[13px] px-4 py-1.5 rounded-full border cursor-default transition-all duration-200";
    if (variant === "primary") return `${base} text-cyan border-[rgba(34,211,238,0.25)] bg-surface hover:border-cyan hover:text-cyan`;
    if (variant === "secondary") return `${base} text-indigo border-[rgba(99,102,241,0.25)] bg-surface hover:border-cyan hover:text-cyan`;
    return `${base} text-muted border-border bg-surface hover:border-cyan hover:text-cyan`;
  };

  return (
    <AnimatedSection id="stack" stagger className="max-w-full mx-auto px-10 max-md:px-5 py-20">
      <SectionHeading
        label="// tecnologías"
        title="Stack & herramientas"
        description="Las tecnologías con las que construyo día a día — desde el frontend hasta el backend y mobile."
      />
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill) => (
          <MotionDiv key={skill.name} variants={staggerVariants}>
            <span className={`${pillStyle(skill.variant)} flex items-center`}>
              {skill.icon && 
                <FontAwesomeIcon icon={skill.icon} size="xl" className="mr-2 max-md:mr-1.5 max-md:text-lg" />
              }
              {skill.name}
            </span>
          </MotionDiv>
        ))}
      </div>
    </AnimatedSection>
  );
}
