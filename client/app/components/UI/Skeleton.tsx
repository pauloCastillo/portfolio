import type { SkeletonProps } from "@/types/loading";

export default function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = "rounded",
  className,
}: Readonly<SkeletonProps>) {
  return (
    <div
      className={`${className} w-[${typeof width === "number" ? `${width}px` : width}] h-[${typeof height === "number" ? `${height}px` : height}] ${rounded} bg-text-muted/20 animate-pulse`}
    />
  );
}