"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

library.add(faGithub, faInstagram, faLinkedin, faMedium, faTiktok);

export default function HeroePage() {
  return (
    <div className="flex flex-col flex-1 text-2xl font-bold justify-center items-center h-screen">
      <p className="font-semibold text-2xl mb-0.5">
        Construyo aplicaciones web y móviles intuitivas y
      </p>
      <p className="font-light text-xl text-center">
        de alto rendimiento que resuelven problemas reales.
      </p>
      <ul className="flex justify-center items-center min-w-full mt-3">
        <li className="mx-1">
          <Link
            href="https://github.com/pauloCastillo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="hover:cursor-pointer hover:transition-all hover:text-purple-500"
            />
          </Link>
        </li>
        <li className="mx-1">
          <Link
            href="https://www.linkedin.com/in/paulocastillomonroy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="hover:cursor-pointer hover:transition-all hover:text-purple-500"
            />
          </Link>
        </li>
        <li className="mx-1">
          <Link
            href="https://www.medium.com/@Paulo_Castillo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faMedium}
              className="hover:cursor-pointer hover:transition-all hover:text-purple-500"
            />
          </Link>
        </li>
        <li className="mx-1">
          <Link
            href="https://www.instagram.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="hover:cursor-pointer hover:transition-all hover:text-purple-500"
            />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.tiktok.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTiktok}
              className="hover:cursor-pointer hover:transition-all hover:text-purple-500"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
