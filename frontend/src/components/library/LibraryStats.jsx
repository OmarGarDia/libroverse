import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Star, Target } from "lucide-react";

export const LibraryStats = () => {
  const stats = [
    {
      icon: BookOpen,
      label: "Total de Libros",
      value: "127",
      color: "#4DB6AC",
    },
    {
      icon: Clock,
      label: "Leyendo Ahora",
      value: "3",
      color: "#D4AF37",
    },
    {
      icon: Star,
      label: "Favoritos",
      value: "24",
      color: "#E74C3C",
    },
    {
      icon: Target,
      label: "Meta Anual",
      value: "85%",
      color: "#9B59B6",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200"
          style={{ backgroundColor: "#FDFBF6" }}
        >
          <CardContent className="p-4 text-center">
            <stat.icon
              className="h-6 w-6 mx-auto mb-2"
              style={{ color: stat.color }}
            />
            <div
              className="text-xl font-bold mb-1"
              style={{ color: "#2C3E50" }}
            >
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: "#7F8C8D" }}>
              {stat.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
