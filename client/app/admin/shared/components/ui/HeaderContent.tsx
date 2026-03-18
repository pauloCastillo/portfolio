import type { HeadersType } from "@/utils/types/adminHeader";

export default function HeaderMainContent({
  title,
  subtitle,
}: Readonly<HeadersType>) {
  return (
    <header className="flex h-20 items-center justify-between px-8 py-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="font-mono text-xs text-primary uppercase tracking-wider mt-1">
          {subtitle}
        </p>
      </div>
      {/* Status Pill */}
      <div className="glass- panel flex items-center gap-3 rounded-full px-4 py-2 shadow-glow-emerald border-neon-emerald/20">
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-emerald"></span>
        </div>

        <span className="font-mono text-xs font-bold tracking-widest text-neon-emerald">
          SYSTEM OPERATIONAL
        </span>
      </div>
    </header>
  );
}
