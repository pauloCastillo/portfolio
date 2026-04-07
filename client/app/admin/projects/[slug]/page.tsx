import { Fragment} from "react"
import ProjectHeader from "./components/ProjectHeader";
import SocialShare from "./components/SocialShare";
import ProjectImage from "./components/ProjectImage";
import ProjectContent from "./components/ProjectContent";

export default function ProjectDetails({
  params
}: {
  params: { slug: string }
}) {
  // Convert slug to a readable title (e.g., "el-nombre-de-mi-proyecto" -> "El Nombre De Mi Proyecto")
  const titleFromSlug = params.slug?.split('-')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))?.join(' ');

  // In a real app, you would fetch project data based on the slug
  // For now, using placeholder data derived from the slug
  const projectData = {
    title: titleFromSlug,
    author: "Nombre del autor",
    date: "2/FEB/2026",
    imageSrc: "/images/project1.svg",
    imageAlt: titleFromSlug,
    content: [
      <p key="1">Este es el contenido del proyecto {titleFromSlug}. En una implementación real, este contenido vendría de una base de datos o CMS.</p>,
      <p key="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>,
      <blockquote key="3" className="border-l-4 border-gray-300 pl-4 italic">
        &doublequote; Una cita destacada del proyecto que resuene con el lector &doublequote;
      </blockquote>,
      <p key="4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    ]
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center py-12 bg-gray-50">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <ProjectHeader 
          title={projectData.title} 
          author={projectData.author} 
          date={projectData.date} 
        />
        <SocialShare />
        <ProjectImage 
          src={projectData.imageSrc} 
          alt={projectData.imageAlt} 
        />
        <ProjectContent>
          {projectData.content.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </ProjectContent>
      </div>
    </div>
  )
}