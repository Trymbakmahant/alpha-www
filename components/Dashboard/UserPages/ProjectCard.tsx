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
    <Link
      href={`/dashboard/projects/${project.id}`}
      className=" w-[300px] h-[300px] "
    >
      <Card className="hover:bg-gray-900 transition-colors">
        <CardHeader>
          <h3 className="font-semibold">{project.title}</h3>
        </CardHeader>
        {project.imageUrl && (
          <div className="relative  w-full h-48 overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover rounded-lg px-4"
            />
          </div>
        )}
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
