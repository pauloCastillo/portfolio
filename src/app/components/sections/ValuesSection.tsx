"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faUsers, faRocket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { StaggerContainer, StaggerItem } from "@/shared/ui/ScrollReveal";
import { useLocale } from "~/lib/LocaleProvider";

library.add(faCode, faUsers, faRocket);

export default function ValuesSection() {
  const { t } = useLocale();

  const values = [
    { icon: faCode, ...t.values.clean },
    { icon: faUsers, ...t.values.community },
    { icon: faRocket, ...t.values.growth },
  ];

  return (
    <section id="valores" className="max-w-full mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-3">
                <FontAwesomeIcon icon={value.icon} className="text-cyan text-[22px]" />
                <h3 className="text-[15px] font-semibold text-text">{value.title}</h3>
                <p className="text-[13px] text-muted leading-[1.6]">{value.description}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
