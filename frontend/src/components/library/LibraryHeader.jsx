import { Button } from "@/components/ui/button";
import { Plus, List, LayoutGrid } from "lucide-react";

export const LibraryHeader = ({ onAddBook, viewMode, onViewModeChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#2C3E50" }}>
          Mi Biblioteca
        </h1>
        <p className="text-lg" style={{ color: "#7F8C8D" }}>
          Gestiona tu colección personal de libros
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* View Mode Buttons */}
        <div className="flex bg-white rounded-lg p-1 shadow-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={`h-8 w-8 p-0 ${
              viewMode === "grid" ? "bg-gray-100" : ""
            }`}
          >
            <LayoutGrid className="h-4 w-4" style={{ color: "#4DB6AC" }} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={`h-8 w-8 p-0 ${
              viewMode === "list" ? "bg-gray-100" : ""
            }`}
          >
            <List className="h-4 w-4" style={{ color: "#4DB6AC" }} />
          </Button>
        </div>

        {/* Add Book Button */}
        <Button
          onClick={onAddBook}
          className="shadow-lg transform hover:scale-105 transition-all duration-200"
          style={{
            backgroundColor: "#4DB6AC",
            color: "#FDFBF6",
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Libro
        </Button>
      </div>
    </div>
  );
};
