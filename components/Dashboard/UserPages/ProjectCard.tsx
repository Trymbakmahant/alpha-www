import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project & {
    user: {
      name: string | null;
      image: string | null;
    };
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card className="bg-[#0F0F0F] border-0 overflow-hidden hover:bg-[#1A1A1A] transition-colors">
        <CardHeader className="p-4">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </CardHeader>
        {project.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardContent className="p-4">
          <p className="text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between">
          <span className="text-sm px-3 py-1 bg-[#2A0E61] text-white rounded-full">
            {project.category}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
