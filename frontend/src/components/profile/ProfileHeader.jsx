import { Button } from "@/components/ui/button";
import { AvatarUpload } from "./AvatarUpload";
import { useAuth } from "@/context/AuthContext";

export const ProfileHeader = ({ onUserDataUpdate }) => {
  const { user } = useAuth();

  const handleAvatarChange = (newAvatarUrl, updatedUserData) => {
    console.log("Avatar cambiado:", newAvatarUrl);
    if (onUserDataUpdate) {
      onUserDataUpdate(updatedUserData);
    }
  };

  const getJoinedDate = () => {
    return new Date().getFullYear(); // simulado por ahora
  };

  const getReadingProgress = () => {
    if (!user?.reading_goal || !user?.books_read_current_year) {
      return { percentage: 0, text: "0 de 50" };
    }

    const percentage = Math.round(
      (user.books_read_current_year / user.reading_goal) * 100
    );
    return {
      percentage: Math.min(percentage, 100),
      text: `${user.books_read_current_year} de ${user.reading_goal}`,
    };
  };

  const readingProgress = getReadingProgress();

  return (
    <div
      className="rounded-xl p-8 shadow-lg mb-8"
      style={{ backgroundColor: "#2C3E50" }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <AvatarUpload
          currentAvatar={user?.avatar}
          userName={user?.name}
          onAvatarChange={handleAvatarChange}
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#FDFBF6" }}>
            {user?.name || "Usuario"}
          </h1>
          <p className="text-xl mb-4 opacity-90" style={{ color: "#4DB6AC" }}>
            {user?.email || "email@ejemplo.com"}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
            <div
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
            >
              📚 {user?.books_read || 0} libros leídos
            </div>
            <div
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
            >
              📅 Miembro desde {getJoinedDate()}
            </div>
            <div
              className="px-4 py-2 rounded-full"
              style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
            >
              🎯 Meta {user?.reading_goal_year || new Date().getFullYear()}:{" "}
              {readingProgress.text} libros
            </div>
            {user?.location && (
              <div
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: "#34495E", color: "#FDFBF6" }}
              >
                📍 {user.location}
              </div>
            )}
          </div>

          {user?.reading_goal && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: "#FDFBF6" }}>
                  Progreso de meta{" "}
                  {user.reading_goal_year || new Date().getFullYear()}
                </span>
                <span className="text-sm" style={{ color: "#4DB6AC" }}>
                  {readingProgress.percentage}%
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full"
                style={{ backgroundColor: "#34495E" }}
              >
                <div
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "#4DB6AC",
                    width: `${readingProgress.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
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
