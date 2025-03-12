import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";
import { CreateProjectButton } from "@/components/Dashboard/CreateProjectButton";

interface ExploreNavbarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
}

export function ExploreNavbar({
  onSearch,
  onCategoryChange,
}: ExploreNavbarProps) {
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      onCategoryChange(value === "all" ? null : value);
    },
    [onCategoryChange]
  );

  return (
    <div className="flex items-center justify-between w-full gap-4 mb-6">
      <div className="flex-1 max-w-[350px]">
        <Input
          placeholder="Search Project"
          className="w-full"
          onChange={handleSearch}
        />
      </div>
      <div>
        <Select onValueChange={handleCategoryChange} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Game">Game</SelectItem>
            <SelectItem value="Web">Web</SelectItem>
            <SelectItem value="Mobile">Mobile</SelectItem>
            <SelectItem value="Desktop">Desktop</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <CreateProjectButton />
      </div>
    </div>
  );
}
