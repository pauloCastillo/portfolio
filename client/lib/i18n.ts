/**
 * Estrategia i18n (punto 5.5 del análisis):
 * - Sitio público bilingüe ES/EN con español como locale por defecto
 *   (el contenido del portfolio es mayoritariamente español).
 * - Consola admin fija en inglés (consola técnica, sin toggle).
 * - Sin dependencias externas: diccionarios tipados + contexto React,
 *   persistencia en `localStorage` y sincronización de `<html lang>`.
 * - Para migrar un componente: usar `useLocale()` de `./LocaleProvider`
 *   y añadir sus claves a ambos diccionarios (el test `i18n.test.ts`
 *   falla si `en` y `es` no tienen exactamente las mismas claves).
 */

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "kastidev-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

const es = {
  nav: {
    stack: "Stack",
    projects: "Proyectos",
    about: "Sobre mí",
    contact: "Contacto",
    cta: "Hablemos →",
    menuLabel: "Abrir o cerrar el menú de navegación",
  },
  footer: {
    tagline: "// Escribo código limpio, construyo ideas reales.",
  },
  locale: {
    label: "Idioma",
    es: "ES",
    en: "EN",
  },
  hero: {
    role: "Fullstack Developer",
    titleStart: "Construyo ideas",
    titleMid: "que",
    titleEnd: "para tu proyecto.",
    words: ["cobran vida", "se despliegan", "escalan", "innovan"],
    description:
      "Aplicaciones web elegantes, eficientes y escalables. De la interfaz al servidor — y de vuelta al usuario.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Trabajemos juntos",
  },
  stack: {
    label: "// tecnologías",
    title: "Stack & herramientas",
    description:
      "Las tecnologías con las que construyo día a día — desde el frontend hasta el backend y mobile.",
  },
  projects: {
    label: "// proyectos",
    title: "Proyectos destacados",
    description:
      "Una muestra de los proyectos que he construido — cada uno con su propia historia y desafíos.",
    viewProject: "ver proyecto ↗",
    loading: "Cargando proyectos...",
    error: "Error al cargar proyectos.",
  },
  values: {
    clean: {
      title: "Código limpio",
      description:
        "No solo que funcione — que sea mantenible, legible y escalable. Cada línea cuenta.",
    },
    community: {
      title: "Comunidad primero",
      description:
        "Aprendo en público, comparto lo que descubro y contribuyo para que todxs crezcamos.",
    },
    growth: {
      title: "Mejora continua",
      description:
        "Cada proyecto es una oportunidad de ser mejor developer que ayer. Siempre en evolución.",
    },
  },
  about: {
    label: "sobre mí",
    location: "Bolivia · remoto disponible",
    years: "años",
    projectsCount: "proyectos",
    paragraphs: [
      [
        { t: "text", v: "Mi viaje en la tecnología comenzó con un simple " },
        { t: "em", v: '"Hola Mundo"' },
        {
          t: "text",
          v: ", y ha evolucionado hacia un profundo amor por construir aplicaciones web elegantes, eficientes y escalables. Cada proyecto es una oportunidad para crear ",
        },
        { t: "em", v: "experiencias de usuario significativas" },
        { t: "text", v: "." },
      ],
      [
        {
          t: "text",
          v: "Como desarrollador fullstack, disfruto tanto del diseño de interfaces pulidas como de la arquitectura de sistemas robustos en el backend. Mi enfoque está en ",
        },
        { t: "em", v: "resolver problemas reales" },
        { t: "text", v: " con código limpio y bien estructurado." },
      ],
      [
        { t: "text", v: "Creo firmemente en el poder del " },
        { t: "em", v: "trabajo en equipo" },
        {
          t: "text",
          v: " por eso aporto a la comunidad open source. Aprendo en público, comparto conocimientos y contribuyo para que todos crezcamos. Fuera del código, me encuentras explorando nuevas tecnologías o escribiendo sobre lo nuevo que aprendo del desarrollo con IA.",
        },
      ],
    ],
  },
  blog: {
    label: "// blog",
    title: "Últimos artículos",
    description: "Pensamientos, tutoriales y descubrimientos.",
    viewAll: "Ver todos los posts →",
  },
  blogPage: {
    title: "Blog",
    description: "Pensamientos, tutoriales y descubrimientos.",
    empty: "Aún no hay posts. Vuelve pronto.",
  },
  postPage: {
    notFound: "Post no encontrado.",
    back: "← Volver al blog",
    draft: "· BORRADOR",
  },
  contact: {
    label: "// contacto",
    title: "¿Tienes un proyecto en mente?",
    description:
      "Ya sea freelance, colaboración o simplemente charlar de tech — estoy a un mensaje de distancia.",
  },
};

export type Dictionary = typeof es;
export type NavKey = keyof Dictionary["nav"];

const en: Dictionary = {
  nav: {
    stack: "Stack",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    cta: "Let's talk →",
    menuLabel: "Toggle navigation menu",
  },
  footer: {
    tagline: "// I write clean code, build real ideas.",
  },
  locale: {
    label: "Language",
    es: "ES",
    en: "EN",
  },
  hero: {
    role: "Fullstack Developer",
    titleStart: "I build ideas",
    titleMid: "that",
    titleEnd: "for your project.",
    words: ["come to life", "get deployed", "scale", "innovate"],
    description:
      "Elegant, efficient, scalable web applications. From the interface to the server — and back to the user.",
    ctaProjects: "View projects",
    ctaContact: "Let's work together",
  },
  stack: {
    label: "// stack",
    title: "Stack & tools",
    description:
      "The technologies I build with every day — from frontend to backend and mobile.",
  },
  projects: {
    label: "// projects",
    title: "Featured projects",
    description:
      "A sample of the projects I've built — each with its own story and challenges.",
    viewProject: "view project ↗",
    loading: "Loading projects...",
    error: "Error loading projects.",
  },
  values: {
    clean: {
      title: "Clean code",
      description:
        "Not just working — maintainable, readable, and scalable. Every line counts.",
    },
    community: {
      title: "Community first",
      description:
        "I learn in public, share what I discover, and contribute so we all grow.",
    },
    growth: {
      title: "Continuous improvement",
      description:
        "Every project is a chance to be a better developer than yesterday. Always evolving.",
    },
  },
  about: {
    label: "about me",
    location: "Bolivia · available remote",
    years: "years",
    projectsCount: "projects",
    paragraphs: [
      [
        { t: "text", v: "My journey in tech started with a simple " },
        { t: "em", v: '"Hello World"' },
        {
          t: "text",
          v: ", and has evolved into a deep love for building elegant, efficient, scalable web applications. Every project is a chance to create ",
        },
        { t: "em", v: "meaningful user experiences" },
        { t: "text", v: "." },
      ],
      [
        {
          t: "text",
          v: "As a fullstack developer, I enjoy polished interface design as much as robust backend architecture. I focus on ",
        },
        { t: "em", v: "solving real problems" },
        { t: "text", v: " with clean, well-structured code." },
      ],
      [
        { t: "text", v: "I strongly believe in the power of " },
        { t: "em", v: "teamwork" },
        {
          t: "text",
          v: ", which is why I contribute to open source. I learn in public, share knowledge, and contribute so we all grow. Outside code, you'll find me exploring new tech or writing about what I learn from AI-assisted development.",
        },
      ],
    ],
  },
  blog: {
    label: "// blog",
    title: "Latest Posts",
    description: "Thoughts, tutorials, and discoveries.",
    viewAll: "View All Posts →",
  },
  blogPage: {
    title: "Blog",
    description: "Thoughts, tutorials, and discoveries.",
    empty: "No posts yet. Stay tuned.",
  },
  postPage: {
    notFound: "Post not found.",
    back: "← Back to blog",
    draft: "· DRAFT",
  },
  contact: {
    label: "// contact",
    title: "Have a project in mind?",
    description:
      "Whether freelance, collaboration, or just talking tech — I'm one message away.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };

/** Devuelve el diccionario del locale pedido, con fallback a español. */
export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : DEFAULT_LOCALE];
}
