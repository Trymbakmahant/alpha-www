"use client";

import { ExplorerNavbar } from "@/components/Dashboard/ExplorerPage/ExplorerNavbar";
import { ProjectCard } from "@/components/Dashboard/ExplorerPage/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function ExplorePageContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: projects, isLoading, error } = useProjects(search, category);

  return (
    <div className="container w-full h-[calc(100vh-100px)] my-6 bg-white/10 mx-auto p-6">
      <ExplorerNavbar onSearch={setSearch} onCategoryChange={setCategory} />

      {error ? (
        <div className="text-center py-10">
          <p className="text-red-500">
            Error loading projects. Please try again.
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] w-[350px] bg-accent/10 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

// Wrap the page with QueryClientProvider
export default function ExplorePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExplorePageContent />
    </QueryClientProvider>
  );
}
