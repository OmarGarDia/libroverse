import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      console.log("🔄 AuthContext: Refrescando datos del usuario...");

      const userData = await authService.checkAuth();
      if (userData) {
        console.log(
          "✅ AuthContext: Datos refrescados desde servidor:",
          userData
        );
        setUser(userData);
        localStorage.setItem("user_data", JSON.stringify(userData));
        return;
      }

      const storedUser = authService.getStoredUser();
      if (storedUser && authService.isAuthenticated()) {
        console.log(
          "📱 AuthContext: Usando datos de localStorage como respaldo:",
          storedUser
        );
        setUser(storedUser);
      } else {
        console.log("❌ AuthContext: No hay datos válidos disponibles");
        setUser(null);
      }
    } catch (error) {
      console.error("❌ AuthContext: Error refrescando usuario:", error);
      const storedUser = authService.getStoredUser();
      if (storedUser && authService.isAuthenticated()) {
        console.log(
          "📱 AuthContext: Usando localStorage después de error:",
          storedUser
        );
        setUser(storedUser);
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔐 AuthContext: Verificación inicial de autenticación...");

        if (!authService.isAuthenticated()) {
          console.log("❌ AuthContext: Usuario no autenticado");
          setUser(null);
          setLoading(false);
          return;
        }

        const storedUser = authService.getStoredUser();
        if (storedUser) {
          console.log(
            "📱 AuthContext: Cargando usuario desde localStorage:",
            storedUser
          );
          setUser(storedUser);
        }

        try {
          const serverUser = await authService.checkAuth();
          if (serverUser) {
            console.log("🌐 AuthContext: Verificado con servidor:", serverUser);
            if (
              !storedUser ||
              JSON.stringify(storedUser) !== JSON.stringify(serverUser)
            ) {
              console.log(
                "🔄 AuthContext: Actualizando con datos del servidor"
              );
              setUser(serverUser);
              localStorage.setItem("user_data", JSON.stringify(serverUser));
            }
          } else {
            console.log("❌ AuthContext: Token inválido, limpiando datos");
            setUser(null);
            await authService.logout();
          }
        } catch (error) {
          console.log(
            "⚠️ AuthContext: Error del servidor, manteniendo datos locales"
          );
          if (!storedUser) {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("❌ AuthContext: Error en verificación inicial:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const updateUser = (newUser) => {
    console.log(
      "🔄 AuthContext: Actualizando usuario:",
      newUser?.name || "null"
    );
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user_data", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user_data");
    }
  };

  const isAuthenticated = !!user && authService.isAuthenticated();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        isAuthenticated,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
