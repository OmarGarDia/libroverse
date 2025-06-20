const API_BASE_URL = "http://localhost:8000/api";

class AuthService {
  getHeaders(includeAuth = false) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const csrfToken = this.getCookie("XSRF-TOKEN");
    if (csrfToken) {
      headers["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);
    }

    if (includeAuth) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  async register(data) {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: this.getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");

    let result;
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error("Respuesta cruda no JSON:", text);
      throw new Error("Respuesta inválida del servidor");
    }

    if (!response.ok) {
      throw new Error(result.message || "Error en el registro");
    }

    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("user_data", JSON.stringify(result.user));
    localStorage.setItem("isLoggedIn", "true");

    return result;
  }

  async login(data) {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: this.getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el inicio de sesión");
    }

    const result = await response.json();

    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("user_data", JSON.stringify(result.user));
    localStorage.setItem("isLoggedIn", "true");

    return result;
  }

  async logout() {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: this.getHeaders(true),
      });
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user_data");
      localStorage.removeItem("auth_token");
    }
  }

  async checkAuth() {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (!token || !userData) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: this.getHeaders(true),
      });

      if (!response.ok) {
        this.logout();
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      console.error("Error verificando autenticación", error);
      this.logout();
      return null;
    }
  }

  getStoredUser() {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated() {
    return (
      localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("auth_token")
    );
  }
}

export const authService = new AuthService();
