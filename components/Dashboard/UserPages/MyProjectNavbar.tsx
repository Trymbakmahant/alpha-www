"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { CreateProjectModal } from "../CreateProjectModal";

interface MyProjectNavbarProps {
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
}

export function MyProjectNavbar({
  onSearch,
  onCategoryChange,
}: MyProjectNavbarProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8 text-white"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px] text-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="defi">DeFi</SelectItem>
              <SelectItem value="game">Game</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create Project Button */}
        <Button onClick={() => setShowCreateModal(true)}>Create Project</Button>

        <CreateProjectModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />
      </div>
    </div>
  );
}
