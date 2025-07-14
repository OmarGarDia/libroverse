import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { LibraryFilters } from "@/components/library/LibraryFilters";
import { LibraryGrid } from "@/components/library/LibraryGrid";
import { LibraryStats } from "@/components/library/LibraryStats";
import { AddBookModal } from "@/components/library/AddBookModal";
import { authService } from "@/services/authService";

const Library = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const user = await authService.checkAuth();
      if (user) {
        setUserData(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
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
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
          <p style={{ color: "#7F8C8D" }}>Cargando biblioteca...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
            Acceso Restringido
          </h2>
          <p style={{ color: "#7F8C8D" }}>
            Debes iniciar sesión para acceder a tu biblioteca.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFBF6" }}>
      <Navigation
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={handleLogout}
        showLogin={false}
        onToggleAuth={() => {}}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <LibraryHeader
          onAddBook={() => setIsAddBookOpen(true)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <LibraryStats />

        <LibraryFilters
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <LibraryGrid
          filter={currentFilter}
          searchQuery={searchQuery}
          viewMode={viewMode}
        />
      </div>

      <AddBookModal
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
      />
    </div>
  );
};

export default Library;
