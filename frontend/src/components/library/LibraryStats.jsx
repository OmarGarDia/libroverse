import React from "react";
import { Card } from "../ui/card";
import { BookOpen, Clock, Star, Target } from "lucide-react";

const LibraryStats = () => {
  const stats = [
    {
      title: "Libros Leídos",
      value: "24",
      icon: BookOpen,
      color: "#E74C3C",
    },
    {
      title: "Leyendo Ahora",
      value: "3",
      icon: Clock,
      color: "#F39C12",
    },
    {
      title: "Calificación Promedio",
      value: "4.2",
      icon: Star,
      color: "#F1C40F",
    },
    {
      title: "Meta Anual",
      value: "50",
      icon: Target,
      color: "#2ECC71",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium mb-2"
                style={{ color: "#7F8C8D" }}
              >
                {stat.title}
              </p>
              <p className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                {stat.value}
              </p>
            </div>
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LibraryStats;
