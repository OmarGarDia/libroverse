import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import Profile from "./pages/Profile";

const ProfileWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);

      const isAuth = authService.isAuthenticated();

      const user = await authService.checkAuth();

      if (user && isAuth) {
        setUserData(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserData(null);

        window.location.href = "/";
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUserData(null);
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p style={{ color: "#7F8C8D" }}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  console.log("🔄 PROFILE WRAPPER: Renderizando Profile con:", {
    isAuthenticated,
    userData: !!userData,
  });

  return (
    <Profile
      userData={userData}
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
    />
  );
};

export default ProfileWrapper;
