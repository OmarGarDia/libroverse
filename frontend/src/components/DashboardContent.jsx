import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { BookOpen, Users, Star, TrendingUp } from "lucide-react";

export const DashboardContent = ({ userData, onRefresh }) => {
  const stats = [
    {
      icon: BookOpen,
      label: "Libros leídos",
      value: "24",
      color: "#4DB6AC",
    },
    {
      icon: Users,
      label: "Comunidad",
      value: "1.2K",
      color: "#D4AF37",
    },
    {
      icon: Star,
      label: "Favoritos",
      value: "89",
      color: "#2C3E50",
    },
    {
      icon: TrendingUp,
      label: "Progreso",
      value: "85%",
      color: "#4DB6AC",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <Card
        className="text-center shadow-xl border-0"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <CardHeader className="pb-6">
          <CardTitle
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#2C3E50" }}
          >
            ¡Bienvenido de vuelta, {userData?.name?.split(" ")[0] || "Usuario"}!
          </CardTitle>
          <CardDescription className="text-lg" style={{ color: "#7F8C8D" }}>
            Continúa tu aventura en el universo de LibroVerse
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {userData && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
              <span style={{ color: "#34495E" }}>
                <strong>Email:</strong> {userData.email}
              </span>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-4"
              />
              <span style={{ color: "#34495E" }}>
                <strong>Miembro desde:</strong> Enero 2024
              </span>
            </div>
          )}

          <Button
            onClick={onRefresh}
            variant="outline"
            className="shadow-lg transform hover:scale-105 transition-all duration-200"
            style={{
              borderColor: "#4DB6AC",
              color: "#4DB6AC",
            }}
            onMouseEnter={(e) => {
              const target = e.target;
              target.style.backgroundColor = "#4DB6AC";
              target.style.color = "#FDFBF6";
            }}
            onMouseLeave={(e) => {
              const target = e.target;
              target.style.backgroundColor = "transparent";
              target.style.color = "#4DB6AC";
            }}
          >
            Actualizar Estado
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow duration-200"
              style={{ backgroundColor: "#FDFBF6" }}
            >
              <CardContent className="p-6">
                <Icon
                  className="h-8 w-8 mx-auto mb-3"
                  style={{ color: stat.color }}
                />
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#2C3E50" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "#7F8C8D" }}>
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200"
          style={{ backgroundColor: "#FDFBF6" }}
        >
          <CardHeader>
            <CardTitle
              className="text-xl font-bold"
              style={{ color: "#2C3E50" }}
            >
              Continuar Leyendo
            </CardTitle>
            <CardDescription style={{ color: "#7F8C8D" }}>
              Retoma donde lo dejaste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{
                backgroundColor: "#4DB6AC",
                color: "#FDFBF6",
              }}
            >
              Ir a Mi Biblioteca
            </Button>
          </CardContent>
        </Card>

        <Card
          className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200"
          style={{ backgroundColor: "#FDFBF6" }}
        >
          <CardHeader>
            <CardTitle
              className="text-xl font-bold"
              style={{ color: "#2C3E50" }}
            >
              Explorar Nuevos Títulos
            </CardTitle>
            <CardDescription style={{ color: "#7F8C8D" }}>
              Descubre tu próxima lectura favorita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{
                backgroundColor: "#D4AF37",
                color: "#2C3E50",
              }}
            >
              Explorar Catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
