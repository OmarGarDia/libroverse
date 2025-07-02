import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthSection } from "@/components/AuthSection";
import { DashboardContent } from "@/components/DashboardContent";
import { WelcomeSection } from "@/components/WelcomeSection";
import { authService } from "@/services/authService";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      console.log("🏠 INDEX: Verificando estado de autenticación...");

      // Primero verificar localStorage directamente
      console.log("🏠 INDEX: Estado localStorage directo:");
      console.log(
        "🏠 INDEX: - auth_token:",
        localStorage.getItem("auth_token") ? "Existe" : "No existe"
      );
      console.log(
        "🏠 INDEX: - user_data:",
        localStorage.getItem("user_data") ? "Existe" : "No existe"
      );
      console.log(
        "🏠 INDEX: - isLoggedIn:",
        localStorage.getItem("isLoggedIn")
      );

      // Verificar con isAuthenticated
      const isAuth = authService.isAuthenticated();
      console.log("🏠 INDEX: authService.isAuthenticated():", isAuth);

      const user = await authService.checkAuth();
      if (user) {
        setUserData(user);
        setIsAuthenticated(true);
        console.log("🏠 INDEX: Usuario autenticado:", user);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        console.log("🏠 INDEX: Usuario NO autenticado");
      }
    } catch (error) {
      console.error("🏠 INDEX: Error verificando autenticación:", error);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("🏠 INDEX: useEffect ejecutándose");

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      console.log("🏠 INDEX: Cerrando sesión...");

      await authService.logout();
      setIsAuthenticated(false);
      setUserData(null);
      console.log("🏠 INDEX: Sesión cerrada correctamente.");
    } catch (error) {
      console.error("🏠 INDEX: Error al cerrar sesión:", error);
    }
  };

  const handleAuthSuccess = () => {
    console.log("🏠 INDEX: handleAuthSuccess ejecutado");

    checkAuthStatus();
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

  console.log("🏠 INDEX: Renderizando con isAuthenticated:", isAuthenticated);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FDFBF6" }}
    >
      <Navigation
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={handleLogout}
        showLogin={showLogin}
        onToggleAuth={() => setShowLogin(!showLogin)}
      />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        {isAuthenticated ? (
          <DashboardContent userData={userData} onRefresh={checkAuthStatus} />
        ) : (
          <div className="flex flex-col items-center w-full max-w-6xl">
            <WelcomeSection />
            <AuthSection
              showLogin={showLogin}
              onAuthSuccess={handleAuthSuccess}
              onToggleAuth={() => setShowLogin(!showLogin)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
