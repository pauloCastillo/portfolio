interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <>
      <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">
        {label}
      </p>
      <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.01em] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted max-w-1/2 leading-relaxed mb-12">
          {description}
        </p>
      )}
    </>
  );
}
