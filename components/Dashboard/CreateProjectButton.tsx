import Link from "next/link";
import { PlusIcon } from "lucide-react";

export function CreateProjectButton() {
  return (
    <Link
      href="/dashboard/projects/new"
      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
    >
      <PlusIcon className="h-5 w-5" />
      Create Project
    </Link>
  );
}
