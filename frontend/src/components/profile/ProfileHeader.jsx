import { Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfileHeader = ({ userData }) => {
  return (
    <div
      className="rounded-xl p-8 shadow-lg mb-8"
      style={{ backgroundColor: "#2C3E50" }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Avatar */}
        <div className="relative">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl"
            style={{ backgroundColor: "#4DB6AC" }}
          >
            <User className="w-16 h-16" style={{ color: "#FDFBF6" }} />
          </div>
          <Button
            size="icon"
            className="absolute bottom-2 right-2 rounded-full shadow-lg"
            style={{ backgroundColor: "#D4AF37", color: "#2C3E50" }}
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#FDFBF6" }}>
            {userData?.name || "Usuario"}
          </h1>
          <p className="text-xl mb-4 opacity-90" style={{ color: "#4DB6AC" }}>
            {userData?.email || "email@ejemplo.com"}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <div
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
            >
              📚 25 libros leídos
            </div>
            <div
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
            >
              ⭐ 4.2 puntuación media
            </div>
            <div
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
            >
              🎯 Meta: 50 libros
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            className="px-6 py-2 rounded-full font-semibold"
            style={{ backgroundColor: "#D4AF37", color: "#2C3E50" }}
          >
            Editar Perfil
          </Button>
          <Button
            variant="outline"
            className="px-6 py-2 rounded-full font-semibold border-2"
            style={{
              borderColor: "#4DB6AC",
              color: "#4DB6AC",
              backgroundColor: "transparent",
            }}
          >
            Compartir
          </Button>
        </div>
      </div>
    </div>
  );
};
