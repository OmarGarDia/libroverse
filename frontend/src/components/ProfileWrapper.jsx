import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "./pages/Profile";
import { authService } from "../services/authService";

const ProfileWrapper = () => {
  const { user, isAuthenticated, loading, setUser } = useAuth();

  // Verificar autenticación directamente desde localStorage como primera prioridad
  const isLocallyAuthenticated = authService.isAuthenticated();
  const localUser = authService.getStoredUser();

  console.log("🔄 PROFILE WRAPPER: Estado detallado:", {
    loading,
    isAuthenticated,
    isLocallyAuthenticated,
    hasUser: !!user,
    hasLocalUser: !!localUser,
    userFromContext: user?.name || "null",
    userFromLocal: localUser?.name || "null",
  });

  useEffect(() => {
    console.log("🔄 PROFILE WRAPPER: useEffect - verificando redirección...");

    // Solo redirigir si definitivamente no está autenticado según localStorage
    if (!loading && !isLocallyAuthenticated && !isAuthenticated) {
      console.log(
        "❌ PROFILE WRAPPER: Usuario no autenticado, redirigiendo..."
      );
      window.location.href = "/";
      return;
    }
  }, [isAuthenticated, loading, isLocallyAuthenticated]);

  const handleLogout = async () => {
    try {
      console.log("🔓 PROFILE WRAPPER: Cerrando sesión...");
      await authService.logout();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  // Mostrar loading solo si realmente está cargando y no hay datos locales
  if (loading && !localUser) {
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

  // Si no está autenticado según localStorage, entonces redirigir
  if (!isLocallyAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <div className="text-center">
          <p style={{ color: "#7F8C8D" }}>Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // Usar datos del contexto si están disponibles, sino usar localStorage
  const currentUser = user || localUser;

  if (!currentUser) {
    console.log("❌ PROFILE WRAPPER: No hay datos de usuario disponibles");
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <div className="text-center">
          <p style={{ color: "#7F8C8D" }}>
            Error: No se pudieron cargar los datos del usuario
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Si usamos datos de localStorage y el contexto no tiene usuario, actualizar el contexto
  if (localUser && !user) {
    console.log(
      "🔄 PROFILE WRAPPER: Sincronizando usuario de localStorage al contexto"
    );
    setUser(localUser);
  }

  console.log(
    "✅ PROFILE WRAPPER: Renderizando Profile con usuario:",
    currentUser.name
  );

  return (
    <Profile
      userData={currentUser}
      isAuthenticated={isLocallyAuthenticated || isAuthenticated}
      onLogout={handleLogout}
    />
  );
};

export default ProfileWrapper;
