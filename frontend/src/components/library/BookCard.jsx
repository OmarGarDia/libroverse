import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Star, Heart, BookOpen } from "lucide-react";

export const BookCard = ({ book }) => {
  const [isFavorite, setIsFavorite] = useState(book.isFavorite);

  const getStatusColor = (status) => {
    switch (status) {
      case "leyendo":
        return "#D4AF37";
      case "leidos":
        return "#4DB6AC";
      case "por-leer":
        return "#7F8C8D";
      default:
        return "#7F8C8D";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "leyendo":
        return "Leyendo";
      case "leidos":
        return "Leído";
      case "por-leer":
        return "Por leer";
      default:
        return status;
    }
  };

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 overflow-hidden"
      style={{ backgroundColor: "#FDFBF6" }}
    >
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Status Badge */}
        <div
          className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: getStatusColor(book.status) }}
        >
          {getStatusText(book.status)}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>

        {/* Progress Bar */}
        {book.status === "leyendo" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${book.progress}%`,
                backgroundColor: "#4DB6AC",
              }}
            />
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3
            className="font-semibold text-sm line-clamp-2 mb-1"
            style={{ color: "#2C3E50" }}
          >
            {book.title}
          </h3>
          <p className="text-xs line-clamp-1" style={{ color: "#7F8C8D" }}>
            {book.author}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "#7F8C8D" }}>{book.pages} páginas</span>

          {book.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span style={{ color: "#7F8C8D" }}>{book.rating}</span>
            </div>
          )}
        </div>

        {book.status === "leyendo" && (
          <div className="text-xs" style={{ color: "#4DB6AC" }}>
            Progreso: {book.progress}%
          </div>
        )}

        <Button
          size="sm"
          className="w-full text-xs shadow-md hover:scale-105 transition-all duration-200"
          style={{
            backgroundColor: book.status === "por-leer" ? "#4DB6AC" : "#D4AF37",
            color: "#FDFBF6",
          }}
        >
          <BookOpen className="h-3 w-3 mr-1" />
          {book.status === "por-leer"
            ? "Empezar a Leer"
            : book.status === "leyendo"
            ? "Continuar"
            : "Ver Detalles"}
        </Button>
      </CardContent>
    </Card>
  );
};
