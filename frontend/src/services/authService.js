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
    console.log("Registering user with data:", data);

    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: this.getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

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
      console.error("Registration error:", result);
      throw new Error(result.message || "Error en el registro");
    }

    console.log("Registration successful:", result);

    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("user_data", JSON.stringify(result.user));
    localStorage.setItem("isLoggedIn", "true");

    return result;
  }

  async login(data) {
    console.log("Logging in user with email:", data.email);

    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: this.getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        console.error("Login error:", errorData);
        throw new Error(errorData.message || "Error en el inicio de sesión");
      } else {
        const text = await response.text();
        console.error("Respuesta cruda no JSON:", text);
        throw new Error("Respuesta inválida del servidor");
      }
    }

    const result = await response.json();
    console.log("Login successful:", result);

    localStorage.setItem("auth_token", result.token);
    localStorage.setItem("user_data", JSON.stringify(result.user));
    localStorage.setItem("isLoggedIn", "true");

    return result;
  }

  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: this.getHeaders(true),
        credentials: "include",
      });

      if (!response.ok) {
        console.warn(
          "🔓 Error en logout del servidor, pero continuando con limpieza local"
        );
      }
    } catch (error) {
      console.error("🔓 Error al cerrar sesión en servidor:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("isLoggedIn");
    }
  }

  async checkAuth() {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!token || !userData || isLoggedIn !== "true") {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: this.getHeaders(true),
        credentials: "include",
      });

      if (!response.ok) {
        this.logout();
        return null;
      }

      const serverUser = await response.json();
      return JSON.parse(userData);
    } catch (error) {
      this.logout();
      return null;
    }
  }

  getStoredUser() {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated() {
    const result =
      localStorage.getItem("isLoggedIn") === "true" &&
      !!localStorage.getItem("auth_token");
    return result;
  }
}

export const authService = new AuthService();
