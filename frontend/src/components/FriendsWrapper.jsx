import React, { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import FriendsPage from "./friends/FriendsPage";

const FriendsWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setLoading(true);

      if (authService.isAuthenticated()) {
        const userData = await authService.checkAuth();
        setIsAuthenticated(true);
        setUserData(userData);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUserData(null);

      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <FriendsPage
      isAuthenticated={isAuthenticated}
      userData={userData}
      onLogout={handleLogout}
    />
  );
};

export default FriendsWrapper;
