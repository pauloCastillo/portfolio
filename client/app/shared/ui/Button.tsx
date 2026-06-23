import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  pressedBtn?: () => void;
  className?: string;
};

export default function Button({
  children,
  pressedBtn,
  className,
}: Readonly<ButtonProps>) {
  return (
    <button onClick={pressedBtn} className={className}>
      {children}
    </button>
  );
}
