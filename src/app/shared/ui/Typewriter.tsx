"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  words,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTick = useCallback(() => {
    if (!isDeleting) {
      if (charIndex < words[wordIndex].length) {
        setCharIndex((c) => c + 1);
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }
  }, [charIndex, isDeleting, wordIndex, words, pauseDuration]);

  useEffect(() => {
    const timeout = setTimeout(handleTick, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [handleTick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={className}>
      {words[wordIndex].substring(0, charIndex)}
      <span className="inline-block w-0.5 h-[1em] bg-cyan ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
