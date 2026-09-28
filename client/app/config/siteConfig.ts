import type { NavKey } from "~/lib/i18n";

export const siteConfig = {
  name: "Kastify",
  description: "Desarrollador especializado en aplicaciones web y móviles escalables.",
  // `key` es la clave de traducción en `lib/i18n.ts` (t.nav[key]);
  // `title` queda como texto por defecto y para `key` de React.
  mainNav: [
    {
      key: "stack",
      title: "Stack",
      href: "#stack",
    },
    {
      key: "projects",
      title: "Proyectos",
      href: "#proyectos",
    },
    {
      key: "about",
      title: "Sobre mí",
      href: "#sobre-mi",
    },
    {
      key: "contact",
      title: "Contacto",
      href: "#contacto",
    },
    {
      key: "blog",
      title: "Blog",
      href: "/blog",
    },
  ] satisfies Array<{ key: NavKey; title: string; href: string }>,
  socialLinks: [
    {
      name: "GitHub",
      href: "https://github.com/pauloCastillo",
      icon: "faGithub",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/paulocastillomonroy",
      icon: "faLinkedin",
    },
    {
      name: "Medium",
      href: "https://www.medium.com/@Paulo_Castillo",
      icon: "faMedium",
    },
    // TODO(3.8): reemplazar con los handles oficiales cuando estén definidos.
    // Instagram → https://www.instagram.com/<handle> (sin "@" en la URL).
    {
      name: "Instagram",
      href: "https://www.instagram.com/@yourprofile",
      icon: "faInstagram",
    },
    // TODO(3.8): reemplazar con el handle oficial cuando esté definido.
    // TikTok → https://www.tiktok.com/@<handle>.
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@yourprofile",
      icon: "faTiktok",
    },
  ],
};
