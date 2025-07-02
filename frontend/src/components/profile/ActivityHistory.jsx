import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen, Star, Heart, MessageCircle } from "lucide-react";

export const ActivityHistory = ({ userData }) => {
  const activities = [
    {
      id: 1,
      type: "book_finished",
      title: "Terminó de leer",
      book: "El Nombre del Viento",
      author: "Patrick Rothfuss",
      date: "2024-06-20",
      time: "14:30",
      icon: BookOpen,
      color: "#4DB6AC",
    },
    {
      id: 2,
      type: "rating",
      title: "Calificó un libro",
      book: "Dune",
      author: "Frank Herbert",
      rating: 5,
      date: "2024-06-18",
      time: "20:15",
      icon: Star,
      color: "#D4AF37",
    },
    {
      id: 3,
      type: "favorite",
      title: "Agregó a favoritos",
      book: "1984",
      author: "George Orwell",
      date: "2024-06-15",
      time: "16:45",
      icon: Heart,
      color: "#E74C3C",
    },
    {
      id: 4,
      type: "review",
      title: "Escribió una reseña",
      book: "Fundación",
      author: "Isaac Asimov",
      date: "2024-06-12",
      time: "19:20",
      icon: MessageCircle,
      color: "#9B59B6",
    },
    {
      id: 5,
      type: "book_started",
      title: "Comenzó a leer",
      book: "El Temor de un Hombre Sabio",
      author: "Patrick Rothfuss",
      date: "2024-06-10",
      time: "10:00",
      icon: BookOpen,
      color: "#4DB6AC",
    },
    {
      id: 6,
      type: "goal_updated",
      title: "Actualizó su meta anual",
      detail: "Meta: 50 libros",
      date: "2024-06-01",
      time: "12:30",
      icon: Activity,
      color: "#16A085",
    },
  ];

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case "book_finished":
        return `${activity.book} por ${activity.author}`;
      case "rating":
        return `${activity.book} - ${activity.rating} estrellas`;
      case "favorite":
        return `${activity.book} por ${activity.author}`;
      case "review":
        return `${activity.book} por ${activity.author}`;
      case "book_started":
        return `${activity.book} por ${activity.author}`;
      case "goal_updated":
        return activity.detail;
      default:
        return "";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star
        key={i}
        className="w-3 h-3 fill-current"
        style={{ color: "#D4AF37" }}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <Activity className="w-5 h-5" style={{ color: "#4DB6AC" }} />
            <span>Actividad Reciente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex space-x-4 group">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: activity.color }}
                      />
                    </div>
                    {index < activities.length - 1 && (
                      <div
                        className="w-0.5 h-12 mt-2"
                        style={{ backgroundColor: "#E5E7EB" }}
                      ></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="p-4 rounded-lg border hover:shadow-md transition-shadow group-hover:bg-gray-50"
                      style={{ backgroundColor: "#FDFBF6" }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4
                          className="font-semibold text-sm"
                          style={{ color: "#2C3E50" }}
                        >
                          {activity.title}
                        </h4>
                        <div className="text-xs text-gray-500 text-right">
                          <div>
                            {new Date(activity.date).toLocaleDateString(
                              "es-ES"
                            )}
                          </div>
                          <div>{activity.time}</div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-2">
                        {getActivityDescription(activity)}
                      </p>

                      {activity.rating && (
                        <div className="flex items-center space-x-1">
                          {renderStars(activity.rating)}
                        </div>
                      )}

                      {activity.type === "review" && (
                        <div
                          className="mt-3 p-3 rounded text-sm italic"
                          style={{
                            backgroundColor: "#F8F9FA",
                            color: "#2C3E50",
                          }}
                        >
                          "Una obra maestra de la ciencia ficción que cambió mi
                          perspectiva sobre el futuro de la humanidad..."
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de actividad */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle style={{ color: "#2C3E50" }}>
            Estadísticas de Actividad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#4DB6AC" }}
              >
                25
              </div>
              <div className="text-sm text-gray-600">Libros terminados</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#D4AF37" }}
              >
                18
              </div>
              <div className="text-sm text-gray-600">Reseñas escritas</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#E74C3C" }}
              >
                12
              </div>
              <div className="text-sm text-gray-600">Libros favoritos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
