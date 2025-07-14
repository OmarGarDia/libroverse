import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const LibraryFilters = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const filters = [
    { id: "todos", label: "Todos", count: 127 },
    { id: "leyendo", label: "Leyendo", count: 3 },
    { id: "leidos", label: "Leídos", count: 89 },
    { id: "por-leer", label: "Por Leer", count: 35 },
    { id: "favoritos", label: "Favoritos", count: 24 },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
          style={{ color: "#7F8C8D" }}
        />
        <Input
          type="text"
          placeholder="Buscar libros..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 shadow-md border-0"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={currentFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={`shadow-md transition-all duration-200 ${
              currentFilter === filter.id ? "" : "hover:scale-105"
            }`}
            style={
              currentFilter === filter.id
                ? {
                    backgroundColor: "#4DB6AC",
                    color: "#FDFBF6",
                    borderColor: "#4DB6AC",
                  }
                : {
                    color: "#4DB6AC",
                    borderColor: "#4DB6AC",
                    backgroundColor: "white",
                  }
            }
          >
            {filter.label}
            <span
              className="ml-2 px-1.5 py-0.5 text-xs rounded-full"
              style={{
                backgroundColor:
                  currentFilter === filter.id
                    ? "rgba(255,255,255,0.2)"
                    : "#4DB6AC",
                color: currentFilter === filter.id ? "#FDFBF6" : "white",
              }}
            >
              {filter.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
