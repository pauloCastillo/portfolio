"use client";
import Button from "@/components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3,
  faJs,
  faSass,
  faReact,
  faVuejs,
  faPython,
  faNodeJs,
  faDocker,
  faGit,
  faFigma,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function AboutPage() {
  const categories = [
    { name: "frontend", skills: [{ icon: faHtml5, name: "HTML5" }] },
    { name: "frontend", skills: [{ icon: faCss3, name: "CSS3" }] },
    { name: "frontend", skills: [{ icon: faJs, name: "JavaScript" }] },
    {
      name: "frontend",
      skills: [{ icon: "/assets/imgs/typescript.svg", name: "Typescript" }],
    },
    { name: "frontend", skills: [{ icon: faReact, name: "React" }] },
    {
      name: "frontend",
      skills: [{ icon: "/assets/imgs/nextjs-icon.svg", name: "Next.js" }],
    },
    { name: "frontend", skills: [{ icon: faVuejs, name: "Vue.js" }] },
    {
      name: "frontend",
      skills: [{ icon: "/assets/imgs/nuxt-js-icon.svg", name: "Nuxt.js" }],
    },
    {
      name: "frontend",
      skills: [{ icon: "/assets/imgs/tailwind-css.svg", name: "TailwindCss" }],
    },
    { name: "frontend", skills: [{ icon: faSass, name: "Sass" }] },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: faNodeJs, name: "Node.js" }],
    },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: faPython, name: "Python" }],
    },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: "/assets/imgs/kotlin.svg", name: "Kotlin" }],
    },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: "/assets/imgs/mysql.svg", name: "MySQL" }],
    },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: "/assets/imgs/postgresql.svg", name: "Postgresql" }],
    },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: "/assets/imgs/mongodb.svg", name: "MongoDB" }],
    },
    {
      name: "Backend y Bases de datos",
      skills: [{ icon: "/assets/imgs/rest-api.svg", name: "REST API" }],
    },
    {
      name: "DevOps y Herramientas",
      skills: [{ icon: faDocker, name: "Docker" }],
    },
    {
      name: "DevOps y Herramientas",
      skills: [{ icon: faGit, name: "Git" }],
    },
    {
      name: "DevOps y Herramientas",
      skills: [{ icon: faGithub, name: "GitHub" }],
    },
    {
      name: "DevOps y Herramientas",
      skills: [{ icon: faFigma, name: "Figma" }],
    },
  ];

  const categoriesControl = (arr: Array<{ name: string }>) => {
    return [...new Set(arr.map((item) => item.name))];
  };

  const downloadBtns = () => {
    console.log(window.open("/assets/docs/pauloCastilloCVes.docsx", "_blank"));
    // () => window.open('/assets/docs/resume.pdf', '_blank')
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="capitalize text-4xl font-bold text-gray-800 dark:text-gray-200">
        Esta es mi trayectoria profesional
      </h1>
      <div className="flex items-center justify-around mt-6 max-w-4xl mb-5">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/imgs/fotoCv.jpg"
            alt="Foto de perfil"
            width={200}
            height={200}
            className="rounded-full mx-auto mt-6"
          />
          <div className="flex items-center justify-center">
            <Button
              className="capitalize bg-green-500 text-white mt-5 min-w-full rounded-md p-1.5 hover:cursor-pointer hover:bg-green-700 hover:transition-colors w-12 mr-4"
              pressedBtn={downloadBtns}
            >
              descargar cv
            </Button>
          </div>
        </div>
        <div className="flex flex-col max-w-lg gap-4 mx-5">
          <p className="ml-4 text-gray-800 dark:text-gray-200">
            Soy un apasionado desarrollador fullstack con una habilidad especial
            para construir aplicaciones web elegantes, eficientes y escalables.
            Mi viaje en la tecnología comenzó con un simple `&quot`Hola
            Mundo`&quot`, y a evolucionado hacia un profundo amor por resolver
            problemas complejos y crear experiencias de usuario significativas.
          </p>
          <p className="ml-4 text-gray-800 dark:text-gray-200">
            A lo largo de mi carrera he tenido el privilegio de trabajar en
            proyectos desafiantes y variados, siempre buscando mejorar mis
            habilidades técnicas y mi capacidad para colaborar efectivamente con
            equipos multidisciplinarios. Cuando no estoy programando, disfruto
            explorando nuevas tecnologías, contribuyendo a proyectos open source
            y compartiendo conocimiento con la comunidad de desarrolladores,
            entre otras cosas.
          </p>
        </div>
      </div>
      <div className="min-w-4xl">
        <h3 className="ml-4 text-gray-800 dark:text-gray-200 text-left mt-6 font-bold text-2xl">
          Habilidades Técnicas
        </h3>
        {categoriesControl(categories).map((category) => {
          return (
            <div className="my-5" key={category}>
              <p className="ml-4 text-gray-800 dark:text-gray-200 capitalize text-2xl mb-8">
                {category}
              </p>
              <ul className="flex items-center justify-center">
                {categories.map((cat) => {
                  return (
                    cat.name === category &&
                    cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex flex-col items-center ml-6 text-gray-600 dark:text-gray-400"
                      >
                        {typeof skill.icon === "string" ? (
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            width={32}
                            height={32}
                          />
                        ) : (
                          <FontAwesomeIcon icon={skill.icon} size="2xl" />
                        )}
                        {skill.name}
                      </li>
                    ))
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
