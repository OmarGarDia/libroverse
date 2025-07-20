import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Star, Clock, CheckCircle, BookOpen } from "lucide-react";

export const BookCard = ({ book }) => {
  const navigate = useNavigate();

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
      className="group overflow-hidden bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/libro/${book.id}`)}
    >
      {/* Portada */}
      <div className="relative overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge de estado */}
        <div className="absolute top-3 right-3">
          <Badge
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${statusInfo.color}20`,
              color: statusInfo.color,
            }}
          >
            <StatusIcon className="h-3 w-3" />
            {statusInfo.label}
          </Badge>
        </div>

        {/* Calificación */}
        {book.rating && (
          <div className="absolute top-3 left-3">
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#F1C40F" }}
            >
              <Star className="h-3 w-3 fill-current" />
              {book.rating}
            </div>
          </div>
        )}
      </div>

      {/* Información del libro */}
      <div className="p-4">
        <h3
          className="font-bold text-sm mb-1 line-clamp-2"
          style={{ color: "#2C3E50" }}
        >
          {book.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: "#7F8C8D" }}>
          {book.author}
        </p>

        {/* Barra de progreso (solo si está leyendo) */}
        {book.status === "leyendo" && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs" style={{ color: "#7F8C8D" }}>
                Progreso
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#2C3E50" }}
              >
                {book.progress}%
              </span>
            </div>
            <Progress value={book.progress} className="h-2" />
          </div>
        )}

        {/* Género y páginas */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {book.genre}
          </Badge>
          <span className="text-xs" style={{ color: "#7F8C8D" }}>
            {book.pages} págs.
          </span>
        </div>
      </div>
    </Card>
  );
};
