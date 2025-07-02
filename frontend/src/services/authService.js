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
    console.log("🔓 Iniciando proceso de logout...");
    console.log(
      "🔓 Token antes del logout:",
      localStorage.getItem("auth_token") ? "Existe" : "No existe"
    );
    console.log(
      "🔓 isLoggedIn antes del logout:",
      localStorage.getItem("isLoggedIn")
    );

    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: this.getHeaders(true),
        credentials: "include",
      });

      console.log("🔓 Respuesta del servidor logout:", response.status);

      if (!response.ok) {
        console.warn(
          "🔓 Error en logout del servidor, pero continuando con limpieza local"
        );
      }
    } catch (error) {
      console.error("🔓 Error al cerrar sesión en servidor:", error);
    } finally {
      console.log("🔓 Limpiando datos locales...");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("isLoggedIn");

      console.log("🔓 Datos después de logout:");
      console.log(
        "🔓 Token después del logout:",
        localStorage.getItem("auth_token")
      );
      console.log(
        "🔓 isLoggedIn después del logout:",
        localStorage.getItem("isLoggedIn")
      );
      console.log(
        "🔓 userData después del logout:",
        localStorage.getItem("user_data")
      );
    }
  }

  async checkAuth() {
    console.log("🔍 Verificando autenticación...");

    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    console.log("🔍 Estado localStorage:");
    console.log("🔍 - Token existe:", !!token);
    console.log("🔍 - UserData existe:", !!userData);
    console.log("🔍 - isLoggedIn:", isLoggedIn);

    if (!token || !userData || isLoggedIn !== "true") {
      console.log("🔍 No hay datos de autenticación válidos en localStorage");
      return null;
    }

    try {
      console.log("🔍 Verificando token con el servidor...");
      const response = await fetch(`${API_BASE_URL}/user`, {
        headers: this.getHeaders(true),
        credentials: "include",
      });

      console.log("🔍 Respuesta del servidor:", response.status);

      if (!response.ok) {
        console.log("🔍 Token inválido, limpiando datos...");
        this.logout();
        return null;
      }

      const serverUser = await response.json();
      console.log("🔍 Usuario válido del servidor:", serverUser);
      return JSON.parse(userData);
    } catch (error) {
      console.error("🔍 Error verificando autenticación:", error);
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
    console.log("🔍 isAuthenticated resultado:", result);
    return result;
  }
}

export const authService = new AuthService();
