import { useQuery } from "@tanstack/react-query";
import { Project } from "@prisma/client";

// Define the Project type with user information
export type ProjectWithUser = Project & {
  user: {
    name: string | null;
    image: string | null;
  };
};

async function fetchUserProjects(
  search: string,
  category: string
): Promise<ProjectWithUser[]> {
  const response = await fetch("/api/projects");
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

export function useProjects(searchQuery: string, category: string) {
  return useQuery({
    queryKey: ["projects", searchQuery, category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (category && category !== "all") params.append("category", category);

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });
}

// Optional: Add a hook to fetch a single project
export function useProject(projectId: string) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      return response.json() as Promise<ProjectWithUser>;
    },
    enabled: !!projectId, // Only fetch when projectId is available
  });
}
