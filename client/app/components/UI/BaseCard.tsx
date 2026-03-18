import React from "react";
import Button from "./Button";
import Image from "next/image";

interface BaseCardProps {
  project: {
    id: number;
    imageUrl: string;
    name: string;
    description: string;
    stack: string[];
  };
}

export default function BaseCard({ project }: Readonly<BaseCardProps>) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div>
        <Image
          src={project.imageUrl}
          alt={project.name}
          width={300}
          height={200}
        />
      </div>
      <div className=" mt-2.5 ">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>
      <div className="mt-2 justify-center flex flex-wrap">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="bg-orange-400 text-white px-2 py-1 rounded mr-2"
          >
            {tech}
          </span>
        ))}
      </div>
      <Button className="capitalize bg-orange-400 text-white mt-5 min-w-full rounded-md p-1.5 hover:cursor-pointer hover:bg-orange-500 hover:transition-colors">
        ver caso de estudio
      </Button>
    </div>
  );
}
