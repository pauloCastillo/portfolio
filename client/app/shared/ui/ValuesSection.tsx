"use client";
import { IconCode, IconUsers, IconRefresh } from "./icons";
import AnimatedSection, { MotionDiv, staggerVariants } from "./AnimatedSection";

const values = [
  {
    icon: <IconCode />,
    title: "Código limpio",
    description: "No solo que funcione — que sea mantenible, legible y escalable en el tiempo.",
  },
  {
    icon: <IconUsers />,
    title: "Comunidad primero",
    description: "Aprendo en público, comparto lo que descubro y creo que el conocimiento se multiplica al compartirse.",
  },
  {
    icon: <IconRefresh />,
    title: "Mejora continua",
    description: "Cada proyecto es una oportunidad de ser mejor developer que el día anterior.",
  },
];

export default function ValuesSection() {
  return (
    <AnimatedSection stagger className="max-w-full mx-auto px-10 max-md:px-5 pb-20 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {values.map((v) => (
          <MotionDiv
            key={v.title}
            variants={staggerVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border border-border rounded-xl p-6"
          >
            <div className="mb-2.5">{v.icon}</div>
            <h3 className="text-[15px] font-semibold text-text mb-1.5">{v.title}</h3>
            <p className="text-[13px] text-muted leading-relaxed">{v.description}</p>
          </MotionDiv>
        ))}
      </div>
    </AnimatedSection>
  );
}
