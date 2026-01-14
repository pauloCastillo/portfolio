import BaseCard from "@/components/UI/BaseCard";

export default function ProjectsLayout() {
  const projects = [
    {
      id: 1,
      name: "Proyecto 1",
      imageUrl: "/images/project1.png",
      description: "Descripción del proyecto 1",
      stack: ["React", "Next.js", "TypeScript"],
    },
    {
      id: 2,
      name: "Proyecto 2",
      imageUrl: "/images/project2.png",
      description: "Descripción del proyecto 2",
      stack: ["React", "Next.js", "TypeScript"],
    },
    {
      id: 3,
      name: "Proyecto 3",
      imageUrl: "/images/project3.png",
      description: "Descripción del proyecto 3",
      stack: ["React", "Next.js", "TypeScript"],
    },
  ];
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Proyectos Destacados
      </h1>
      <p className="font-light text-xs text-center mt-2.5">
        Te presento una lista de mis proyectos más destacados.
        <br /> Mostrándote mis habilidades y experiencia en desarrollo y diseño
        web.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <BaseCard key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}
