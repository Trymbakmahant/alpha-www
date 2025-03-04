"use client";

import { useState } from "react";
import { CreateProjectModal } from "./CreateProjectModal";
import { Button } from "@/components/ui/button";

export function ExplorerNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center w-full">
      {/* Your existing ExplorerNavbar content */}

      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Create Project
      </Button>

      <CreateProjectModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
