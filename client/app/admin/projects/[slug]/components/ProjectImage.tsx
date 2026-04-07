import Image from "next/image";

export default function ProjectImage({ src, alt }: { src: string; alt: string }){
  return ( 
    <div className="mb-8">
        <Image 
        src={src}
        alt={alt}
        className="rounded-lg shadow-lg"
        priority
        />
    </div>
    )
}
