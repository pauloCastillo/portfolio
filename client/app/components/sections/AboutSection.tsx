"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { ScrollReveal, SlideIn } from "@/shared/ui/ScrollReveal";
import { useLocale } from "~/lib/LocaleProvider";

library.add(faLocationDot);

export default function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="sobre-mi" className="max-w-full mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <ScrollReveal>
        <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-8">
          {t.about.label}
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 max-md:gap-10">
        <SlideIn direction="left">
          <div className="bg-surface border border-border rounded-xl p-10 max-md:p-6 flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full bg-surface-2 border-2 border-cyan flex items-center justify-center mb-4 overflow-hidden backdrop-blur-lg">
              <Image
                src="/assets/imgs/fotoCV.jpg"
                alt="me"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-text">Paulo Castillo</h3>
            <p className="font-mono text-[13px] text-cyan mt-1">@kastidev</p>
            <p className="font-mono text-[13px] text-muted mt-3 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
              {t.about.location}
            </p>
            <div className="flex gap-8 mt-8 pt-8 border-t border-border w-full justify-center">
              <div className="text-center">
                <p className="font-mono text-[22px] font-bold text-text">6+</p>
                <p className="text-[11px] text-muted uppercase tracking-wider">{t.about.years}</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-[22px] font-bold text-text">10+</p>
                <p className="text-[11px] text-muted uppercase tracking-wider">{t.about.projectsCount}</p>
              </div>
            </div>
          </div>
        </SlideIn>

        <SlideIn direction="right">
          <div className="flex flex-col gap-5">
            {t.about.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base text-muted leading-[1.8]">
                {paragraph.map((segment, j) =>
                  segment.t === "em" ? (
                    <span key={j} className="text-text font-medium">
                      {segment.v}
                    </span>
                  ) : (
                    <span key={j}>{segment.v}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
