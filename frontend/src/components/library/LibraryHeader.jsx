import React from "react";
import { Button } from "../ui/button";
import { List, LayoutGrid } from "lucide-react";

const LibraryHeader = ({ viewMode, onViewModeChange }) => {
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
        {/* Botones para cambiar el modo de vista */}
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
      </div>
    </div>
  );
};

export default LibraryHeader;
