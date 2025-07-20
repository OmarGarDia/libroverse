import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export const LibraryFilters = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const filters = [
    { id: "todos", label: "Todos los Libros", count: 32 },
    { id: "leyendo", label: "Leyendo", count: 3 },
    { id: "leidos", label: "Leídos", count: 24 },
    { id: "por-leer", label: "Por Leer", count: 5 },
    { id: "favoritos", label: "Favoritos", count: 8 },
  ];

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
          style={{ color: "#7F8C8D" }}
        />
        <Input
          type="text"
          placeholder="Buscar en tu biblioteca..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-lg border-0 shadow-lg"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={currentFilter === filter.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            className={`h-10 px-4 rounded-full font-medium transition-all duration-200 ${
              currentFilter === filter.id
                ? "shadow-lg transform hover:scale-105"
                : "bg-white hover:shadow-md"
            }`}
            style={
              currentFilter === filter.id
                ? {
                    backgroundColor: "#4DB6AC",
                    color: "#FDFBF6",
                    borderColor: "#4DB6AC",
                  }
                : { color: "#2C3E50", borderColor: "#E5E7EB" }
            }
          >
            {filter.label}
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                currentFilter === filter.id ? "bg-white/20" : "bg-gray-100"
              }`}
              style={
                currentFilter === filter.id
                  ? { color: "#FDFBF6" }
                  : { color: "#7F8C8D" }
              }
            >
              {filter.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
