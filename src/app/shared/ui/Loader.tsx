import type { LoaderProps } from "@/types/loading";

export default function Loader({
  size = "md",
  label,
  className,
}: Readonly<LoaderProps>) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className={`${className} flex items-center gap-2`}>
      <div className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizeMap[size]}`} />
      {label && <span className="text-sm text-text-muted">{label}</span>}
    </div>
  );
}