"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faLink, faCheck } from "@fortawesome/free-solid-svg-icons"

type SocialShareProps = {
  title: string;
};

const buttonClassName =
  "text-gray-400 transition-all hover:scale-110 cursor-pointer";

export default function SocialShare({ title }: Readonly<SocialShareProps>){
    const [copied, setCopied] = useState(false);

    const getPageUrl = () =>
      typeof window !== "undefined" ? window.location.href : "";

    const openShareWindow = (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer,width=600,height=540");
    };

    const shareOnFacebook = () => {
      openShareWindow(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPageUrl())}`
      );
    };

    const shareOnX = () => {
      openShareWindow(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(getPageUrl())}&text=${encodeURIComponent(title)}`
      );
    };

    const shareOnLinkedIn = () => {
      openShareWindow(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getPageUrl())}`
      );
    };

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(getPageUrl());
      } catch {
        const fallback = document.createElement("textarea");
        fallback.value = getPageUrl();
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand("copy");
        document.body.removeChild(fallback);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    };

    return(
    <div className="flex items-center space-x-4 mb-8">
        <button
          type="button"
          onClick={shareOnFacebook}
          title="Compartir en Facebook"
          aria-label="Compartir en Facebook"
          className={`${buttonClassName} hover:text-blue-500`}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </button>
        <button
          type="button"
          onClick={shareOnX}
          title="Compartir en X"
          aria-label="Compartir en X"
          className={`${buttonClassName} hover:text-blue-500`}
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </button>
        <button
          type="button"
          onClick={shareOnLinkedIn}
          title="Compartir en LinkedIn"
          aria-label="Compartir en LinkedIn"
          className={`${buttonClassName} hover:text-blue-700`}
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </button>
        <button
          type="button"
          onClick={() => void copyLink()}
          title={copied ? "¡Enlace copiado!" : "Copiar enlace"}
          aria-label="Copiar enlace del proyecto"
          className={`${buttonClassName} ${copied ? "text-emerald-500" : "hover:text-yellow-400"}`}
        >
          <FontAwesomeIcon icon={copied ? faCheck : faLink} />
        </button>
        {copied && (
          <span className="font-mono text-xs text-emerald-500">
            ¡Enlace copiado!
          </span>
        )}
    </div>
    )
}
