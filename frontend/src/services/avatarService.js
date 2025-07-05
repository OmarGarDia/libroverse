const API_BASE_URL = "http://localhost:8000/api";

class AvatarService {
  getHeaders(includeAuth = false) {
    const headers = {
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

  async updateAvatar(file) {
    console.log("Subiendo avatar al servidor...");

    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${API_BASE_URL}/user/avatar`, {
      method: "POST",
      headers: this.getHeaders(true),
      credentials: "include",
      body: formData,
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        console.error("Avatar upload error:", errorData);
        throw new Error(errorData.message || "error al subir el avatar");
      } else {
        const text = await response.text();
        console.error("Respuesta cruda no JSON:", text);
        throw new Error("Respuesta inválida del servidor");
      }
    }

    const result = await response.json();
    console.log("Avatar upload result:", result);

    localStorage.setItem("user_data", JSON.stringify(result.user));

    return result;
  }
}

export const avatarService = new AvatarService();
