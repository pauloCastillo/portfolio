"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { siteConfig } from "@/config/siteConfig";

library.add(faGithub, faInstagram, faLinkedin, faMedium, faTiktok);

export default function HeroePage() {
  // Create a mapping from social link names to icon objects
  const iconMap: Record<string, IconDefinition> = {
    faGithub,
    faInstagram,
    faLinkedin,
    faMedium,
    faTiktok,
  };

  return (
    <div className="flex flex-col flex-1 text-2xl font-bold justify-center items-center h-screen">
      <p className="font-semibold text-2xl mb-0.5">
        Construyo aplicaciones web y móviles intuitivas y
      </p>
      <p className="font-light text-xl text-center">
        de alto rendimiento que resuelven problemas reales.
      </p>
      <ul className="flex justify-center items-center min-w-full mt-3">
        {siteConfig.socialLinks.map((social) => (
          <li key={social.name} className="mx-1">
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={iconMap[social.icon]}
                className="hover:cursor-pointer hover:transition-all hover:text-purple-500"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
