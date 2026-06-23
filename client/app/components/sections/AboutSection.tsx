"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { ScrollReveal, SlideIn } from "@/shared/ui/ScrollReveal";

library.add(faLocationDot);

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="max-w-full mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <ScrollReveal>
        <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-8">
          sobre mí
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
              Bolivia · remoto disponible
            </p>
            <div className="flex gap-8 mt-8 pt-8 border-t border-border w-full justify-center">
              <div className="text-center">
                <p className="font-mono text-[22px] font-bold text-text">6+</p>
                <p className="text-[11px] text-muted uppercase tracking-wider">años</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-[22px] font-bold text-text">10+</p>
                <p className="text-[11px] text-muted uppercase tracking-wider">proyectos</p>
              </div>
            </div>
          </div>
        </SlideIn>

        <SlideIn direction="right">
          <div className="flex flex-col gap-5">
            <p className="text-base text-muted leading-[1.8]">
              Mi viaje en la tecnología comenzó con un simple <span className="text-text font-medium">&quot;Hola Mundo&quot;</span>, y ha evolucionado hacia un profundo amor por construir aplicaciones web elegantes, eficientes y escalables. Cada proyecto es una oportunidad para crear <span className="text-text font-medium">experiencias de usuario significativas</span>.
            </p>
            <p className="text-base text-muted leading-[1.8]">
              Como desarrollador fullstack, disfruto tanto del diseño de interfaces pulidas como de la arquitectura de sistemas robustos en el backend. Mi enfoque está en <span className="text-text font-medium">resolver problemas reales</span> con código limpio y bien estructurado.
            </p>
            <p className="text-base text-muted leading-[1.8]">
              Creo firmemente en el poder del <span className="text-text font-medium">trabajo en equipo</span> por eso aporto a la comunidad open source. Aprendo en público, comparto conocimientos y contribuyo para que todos crezcamos. Fuera del código, me encuentras explorando nuevas tecnologías o escribiendo sobre lo nuevo que aprendo del desarrollo con IA.
            </p>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
