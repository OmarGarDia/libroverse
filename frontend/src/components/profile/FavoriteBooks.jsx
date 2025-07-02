import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FavoriteBooks = ({ userData }) => {
  const favoriteBooks = [
    {
      id: 1,
      title: "El Nombre del Viento",
      author: "Patrick Rothfuss",
      rating: 5,
      cover: "/placeholder.svg",
      genre: "Fantasía",
      readDate: "2024-01-15",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      rating: 5,
      cover: "/placeholder.svg",
      genre: "Distopía",
      readDate: "2024-02-20",
    },
    {
      id: 3,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      rating: 4,
      cover: "/placeholder.svg",
      genre: "Realismo Mágico",
      readDate: "2024-03-10",
    },
    {
      id: 4,
      title: "Dune",
      author: "Frank Herbert",
      rating: 5,
      cover: "/placeholder.svg",
      genre: "Ciencia Ficción",
      readDate: "2024-04-05",
    },
    {
      id: 5,
      title: "El Hobbit",
      author: "J.R.R. Tolkien",
      rating: 4,
      cover: "/placeholder.svg",
      genre: "Fantasía",
      readDate: "2024-05-12",
    },
    {
      id: 6,
      title: "Fundación",
      author: "Isaac Asimov",
      rating: 5,
      cover: "/placeholder.svg",
      genre: "Ciencia Ficción",
      readDate: "2024-06-18",
    },
  ];

  const currentlyReading = [
    {
      id: 1,
      title: "El Temor de un Hombre Sabio",
      author: "Patrick Rothfuss",
      progress: 65,
      cover: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Neuromante",
      author: "William Gibson",
      progress: 23,
      cover: "/placeholder.svg",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-current" : ""}`}
        style={{ color: i < rating ? "#D4AF37" : "#E5E7EB" }}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Leyendo actualmente */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <BookOpen className="w-5 h-5" style={{ color: "#4DB6AC" }} />
            <span>Leyendo Actualmente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentlyReading.map((book) => (
              <div
                key={book.id}
                className="flex space-x-4 p-4 rounded-lg"
                style={{ backgroundColor: "#F8F9FA" }}
              >
                <div
                  className="w-20 h-28 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#4DB6AC" }}
                >
                  <BookOpen className="w-8 h-8" style={{ color: "#FDFBF6" }} />
                </div>
                <div className="flex-1">
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "#2C3E50" }}
                  >
                    {book.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">{book.author}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#2C3E50" }}>Progreso</span>
                      <span style={{ color: "#4DB6AC" }}>{book.progress}%</span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: "#E8F5E8" }}
                    >
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: "#4DB6AC",
                          width: `${book.progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Libros favoritos */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <Heart className="w-5 h-5" style={{ color: "#E74C3C" }} />
            <span>Mis Libros Favoritos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteBooks.map((book) => (
              <div
                key={book.id}
                className="group hover:shadow-lg transition-shadow rounded-lg p-4 border border-gray-100"
              >
                <div className="flex space-x-4">
                  <div
                    className="w-16 h-24 rounded-lg flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: "#4DB6AC" }}
                  >
                    <BookOpen
                      className="w-6 h-6"
                      style={{ color: "#FDFBF6" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-semibold text-sm mb-1 line-clamp-2"
                      style={{ color: "#2C3E50" }}
                    >
                      {book.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(book.rating)}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{ backgroundColor: "#E8F5E8", color: "#2C3E50" }}
                      >
                        {book.genre}
                      </span>
                      <span className="text-gray-500">
                        {new Date(book.readDate).toLocaleDateString("es-ES", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="w-full"
                    style={{ backgroundColor: "#4DB6AC", color: "#FDFBF6" }}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
