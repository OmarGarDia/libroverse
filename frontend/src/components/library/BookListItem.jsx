import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, BookOpen } from "lucide-react";

export const BookListItem = ({ book }) => {
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
        return "Por Leer";
      default:
        return status;
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-all duration-200 border-0"
      style={{ backgroundColor: "#FDFBF6" }}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Book Cover */}
          <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-md">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-grow">
                <h3
                  className="font-semibold text-lg mb-1 truncate"
                  style={{ color: "#2C3E50" }}
                >
                  {book.title}
                </h3>
                <p
                  className="text-sm mb-2 truncate"
                  style={{ color: "#7F8C8D" }}
                >
                  por {book.author}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <span
                    className="px-2 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: getStatusColor(book.status) }}
                  >
                    {getStatusText(book.status)}
                  </span>

                  <span style={{ color: "#7F8C8D" }}>{book.genre}</span>

                  <span style={{ color: "#7F8C8D" }}>{book.pages} páginas</span>

                  {book.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span style={{ color: "#7F8C8D" }}>{book.rating}</span>
                    </div>
                  )}
                </div>

                {book.status === "leyendo" && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: "#4DB6AC" }}>
                        Progreso: {book.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: `${book.progress}%`,
                          backgroundColor: "#4DB6AC",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>

                <Button
                  size="sm"
                  className="shadow-md hover:scale-105 transition-all duration-200"
                  style={{
                    backgroundColor:
                      book.status === "por-leer" ? "#4DB6AC" : "#D4AF37",
                    color: "#FDFBF6",
                  }}
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  {book.status === "por-leer"
                    ? "Empezar"
                    : book.status === "leyendo"
                    ? "Continuar"
                    : "Ver"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
