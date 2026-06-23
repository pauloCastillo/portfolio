import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
}

export default function Container({ children, className = "", as: Tag = "section", id }: ContainerProps) {
  return (
    <Tag id={id} className={`max-w-[1100px] mx-auto px-10 py-20 ${className}`}>
      {children}
    </Tag>
  );
}
