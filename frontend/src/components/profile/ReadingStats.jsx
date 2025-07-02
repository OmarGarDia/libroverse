import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, Star, Target } from "lucide-react";

export const ReadingStats = ({ userData }) => {
  const stats = [
    {
      title: "Libros Leídos",
      value: "25",
      subtitle: "Este año",
      icon: Book,
      color: "#4DB6AC",
    },
    {
      title: "Horas de Lectura",
      value: "127h",
      subtitle: "Total estimado",
      icon: Clock,
      color: "#D4AF37",
    },
    {
      title: "Puntuación Media",
      value: "4.2",
      subtitle: "De 5 estrellas",
      icon: Star,
      color: "#E67E22",
    },
    {
      title: "Meta Anual",
      value: "50%",
      subtitle: "25 de 50 libros",
      icon: Target,
      color: "#9B59B6",
    },
  ];

  const monthlyReading = [
    { month: "Ene", books: 3 },
    { month: "Feb", books: 2 },
    { month: "Mar", books: 4 },
    { month: "Abr", books: 3 },
    { month: "May", books: 5 },
    { month: "Jun", books: 2 },
    { month: "Jul", books: 3 },
    { month: "Ago", books: 3 },
  ];

  const genreStats = [
    { genre: "Fantasía", count: 8, percentage: 32 },
    { genre: "Ciencia Ficción", count: 6, percentage: 24 },
    { genre: "Misterio", count: 4, percentage: 16 },
    { genre: "Romance", count: 3, percentage: 12 },
    { genre: "Biografía", count: 2, percentage: 8 },
    { genre: "Otros", count: 2, percentage: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="shadow-lg border-0 hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progreso mensual */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle style={{ color: "#2C3E50" }}>Progreso Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyReading.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium w-12"
                    style={{ color: "#2C3E50" }}
                  >
                    {month.month}
                  </span>
                  <div className="flex-1 mx-4">
                    <div
                      className="h-6 rounded-full flex items-center px-2"
                      style={{ backgroundColor: "#E8F5E8" }}
                    >
                      <div
                        className="h-4 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: "#4DB6AC",
                          width: `${(month.books / 5) * 100}%`,
                          minWidth: month.books > 0 ? "8%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                  <span
                    className="text-sm font-semibold w-8 text-right"
                    style={{ color: "#2C3E50" }}
                  >
                    {month.books}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Géneros favoritos */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle style={{ color: "#2C3E50" }}>
              Géneros Favoritos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {genreStats.map((genre, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#2C3E50" }}
                      >
                        {genre.genre}
                      </span>
                      <span className="text-xs text-gray-500">
                        {genre.count} libros
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: "#E8F5E8" }}
                    >
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: "#4DB6AC",
                          width: `${genre.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
