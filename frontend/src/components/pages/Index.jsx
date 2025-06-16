import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthSection } from "@/components/AuthSection";
import { DashboardContent } from "@/components/DashboardContent";
import { WelcomeSection } from "@/components/WelcomeSection";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);

  const checkAuthStatus = async () => {
    try {
      console.log("Verificando estado de autenticación...");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        setUserData({ name: "Usuario Demo", email: "demo@ejemplo.com" });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.log("Usuario no autenticado:", error);
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isLoggedIn");
      setIsAuthenticated(false);
      setUserData(null);
      console.log("Sesión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleAuthSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    checkAuthStatus();
  };

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
