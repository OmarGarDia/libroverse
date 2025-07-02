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
      console.log("🔄 PROFILE WRAPPER: Verificando autenticación...");

      // Verificar localStorage directamente
      console.log("🔄 PROFILE WRAPPER: Estado localStorage directo:");
      console.log(
        "🔄 PROFILE WRAPPER: - auth_token:",
        localStorage.getItem("auth_token") ? "Existe" : "No existe"
      );
      console.log(
        "🔄 PROFILE WRAPPER: - user_data:",
        localStorage.getItem("user_data") ? "Existe" : "No existe"
      );
      console.log(
        "🔄 PROFILE WRAPPER: - isLoggedIn:",
        localStorage.getItem("isLoggedIn")
      );

      const isAuth = authService.isAuthenticated();
      console.log("🔄 PROFILE WRAPPER: authService.isAuthenticated():", isAuth);

      const user = await authService.checkAuth();
      console.log("🔄 PROFILE WRAPPER: checkAuth result:", user);

      if (user && isAuth) {
        setUserData(user);
        setIsAuthenticated(true);
        console.log("✅ PROFILE WRAPPER: Usuario autenticado", user);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        console.log("❌ PROFILE WRAPPER: Usuario NO autenticado");
        console.log("❌ PROFILE WRAPPER: - user:", user);
        console.log("❌ PROFILE WRAPPER: - isAuth:", isAuth);
        console.log("❌ PROFILE WRAPPER: Redirigiendo a home...");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("❌ PROFILE WRAPPER: Error:", error);
      setIsAuthenticated(false);
      setUserData(null);
      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔄 PROFILE WRAPPER: useEffect ejecutándose");
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
