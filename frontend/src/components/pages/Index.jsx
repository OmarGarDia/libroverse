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
      console.log("Verificando estado de autenticación...");

      const user = await authService.checkAuth();
      if (user) {
        setUserData(user);
        setIsAuthenticated(true);
        console.log("Usuario autenticado", user);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        console.log("Usuario no autenticado");
      }
    } catch (error) {
      console.log("Error verificando autenticación", error);
      setIsAuthenticated(false);
      setUserData(null);
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
      console.log("Sesion cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleAuthSuccess = () => {
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
