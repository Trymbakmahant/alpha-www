"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({
  open,
  onOpenChange,
}: CreateProjectModalProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "Game", // Default category
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      console.error("No user session found");
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userEmail: session.user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      onOpenChange(false);
      router.refresh();
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        category: "Game",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Create New Project
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              rows={4}
              required
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full p-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              required
            >
              <option value="Game">Game</option>
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-gray-600 bg-white/50 backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white rounded-md hover:bg-blue-700/90 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
