"use client";

import { siteConfig } from "@/config/siteConfig";
import { ScrollReveal, ScaleIn, StaggerContainer, StaggerItem } from "@/shared/ui/ScrollReveal";

export default function ContactSection() {
  const socials = [
    { name: "GitHub", url: "https://github.com/pauloCastillo" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/paulocastillomonroy" },
    { name: "YouTube", url: "https://youtube.com/@kastidev" },
    { name: "TikTok", url: "https://tiktok.com/@kastidev" },
  ];

  return (
    <section id="contacto" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <ScaleIn>
        <div className="bg-surface border border-border rounded-2xl p-14 max-md:p-8 flex flex-col items-center text-center">
          <ScrollReveal direction="none">
            <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-4">
              // contacto
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold mb-4">
              ¿Tienes un proyecto en mente?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base text-muted max-w-[420px] leading-relaxed mb-10">
              Ya sea freelance, colaboración o simplemente charlar de tech — estoy a un mensaje de distancia.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <a
              href="mailto:hola@kastidev.dev"
              className="font-mono text-sm font-medium bg-cyan text-[#0f1117] px-8 py-3.5 rounded-lg no-underline transition-opacity duration-200 hover:opacity-85"
            >
              hola@kastidev.dev
            </a>
          </ScrollReveal>
          <StaggerContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {socials.map((social) => (
                <StaggerItem key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-muted no-underline border border-border px-5 py-2.5 rounded-lg transition-colors duration-200 hover:text-cyan hover:border-[rgba(34,211,238,0.4)]"
                  >
                    {social.name}
                  </a>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </ScaleIn>
    </section>
  );
}
