import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Star,
  Clock,
  CheckCircle,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";

export const BookListItem = ({ book }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "leyendo":
        return { icon: Clock, label: "Leyendo", color: "#F39C12" };
      case "leidos":
        return { icon: CheckCircle, label: "Leído", color: "#2ECC71" };
      case "por-leer":
        return { icon: BookOpen, label: "Por Leer", color: "#3498DB" };
      default:
        return { icon: BookOpen, label: "Desconocido", color: "#7F8C8D" };
    }
  };

  const statusInfo = getStatusInfo(book.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Card
      className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/libro/${book.id}`)}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-24 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Book Details */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-grow">
                <h3
                  className="font-bold text-lg mb-1 truncate"
                  style={{ color: "#2C3E50" }}
                >
                  {book.title}
                </h3>
                <p className="text-sm mb-2" style={{ color: "#7F8C8D" }}>
                  por {book.author}
                </p>
              </div>

              <Button variant="ghost" size="sm" className="flex-shrink-0 ml-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Status and Rating */}
            <div className="flex items-center gap-3 mb-3">
              <Badge
                className="flex items-center gap-1 px-2 py-1 text-xs"
                style={{
                  backgroundColor: `${statusInfo.color}20`,
                  color: statusInfo.color,
                }}
              >
                <StatusIcon className="h-3 w-3" />
                {statusInfo.label}
              </Badge>

              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star
                    className="h-4 w-4 fill-current"
                    style={{ color: "#F1C40F" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#2C3E50" }}
                  >
                    {book.rating}
                  </span>
                </div>
              )}

              <Badge variant="outline" className="text-xs">
                {book.genre}
              </Badge>
            </div>

            {/* Progress (for reading books) */}
            {book.status === "leyendo" && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs" style={{ color: "#7F8C8D" }}>
                    Progreso de lectura
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#2C3E50" }}
                  >
                    {book.progress}% (
                    {Math.round((book.progress / 100) * book.pages)} de{" "}
                    {book.pages} páginas)
                  </span>
                </div>
                <Progress value={book.progress} className="h-2" />
              </div>
            )}

            {/* Additional Info */}
            <div
              className="flex items-center justify-between text-xs"
              style={{ color: "#7F8C8D" }}
            >
              <span>{book.pages} páginas</span>
              {book.dateFinished && (
                <span>
                  Terminado el{" "}
                  {new Date(book.dateFinished).toLocaleDateString("es-ES")}
                </span>
              )}
              {book.dateStarted && book.status === "leyendo" && (
                <span>
                  Iniciado el{" "}
                  {new Date(book.dateStarted).toLocaleDateString("es-ES")}
                </span>
              )}
              {book.dateAdded && book.status === "por-leer" && (
                <span>
                  Agregado el{" "}
                  {new Date(book.dateAdded).toLocaleDateString("es-ES")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
