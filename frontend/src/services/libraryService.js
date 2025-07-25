const API_BASE_URL = "http://localhost:8000/api";

class LibraryService {
  getHeaders(includeAuth = true) {
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

  async getLibrary() {
    const response = await fetch(`${API_BASE_URL}/library`, {
      headers: this.getHeaders(true),
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error loading library:", errorText);
      throw new Error("Error al cargar la biblioteca");
    }

    const data = await response.json();
    return data;
  }

  async getStats() {
    const response = await fetch(`${API_BASE_URL}/library/stats`, {
      headers: this.getHeaders(true),
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error loading stats:", errorText);
      throw new Error("Error al cargar las estadísticas");
    }

    const data = await response.json();
    return data;
  }

  async addBook(bookData) {
    const response = await fetch(`${API_BASE_URL}/library/books`, {
      method: "POST",
      headers: this.getHeaders(true),
      credentials: "include",
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error adding book:", errorText);
      throw new Error("Error al agregar el libro");
    }

    return response.json();
  }

  async updateProgress(userBookId, progress, currentPage) {
    const response = await fetch(
      `${API_BASE_URL}/library/books/${userBookId}/progress`,
      {
        method: "PUT",
        headers: this.getHeaders(true),
        credentials: "include",
        body: JSON.stringify({ progress, current_page: currentPage }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error updating progress:", errorText);
      throw new Error("Error al actualizar el progreso");
    }
  }

  async rateBook(userBookId, rating) {
    const response = await fetch(
      `${API_BASE_URL}/library/books/${userBookId}/rating`,
      {
        method: "PUT",
        headers: this.getHeaders(true),
        credentials: "include",
        body: JSON.stringify({ rating }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error rating book:", errorText);
      throw new Error("Error al calificar el libro");
    }
  }

  async removeBook(userBookId) {
    const response = await fetch(
      `${API_BASE_URL}/library/books/${userBookId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(true),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error removing book:", errorText);
      throw new Error("Error al eliminar el libro");
    }
  }
}

export const libraryService = new LibraryService();
