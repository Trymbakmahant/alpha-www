import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";

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
    <div className="flex flex-col sm:flex-row gap-4">
      <Input
        placeholder="Search projects..."
        className="sm:w-[350px]"
        onChange={handleSearch}
      />
      <Select onValueChange={handleCategoryChange} defaultValue="all">
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Select category" />
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
  );
}
