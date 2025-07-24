import { authService } from "./authService";

const API_BASE_URL = "http://localhost:8000/api";

class BookNotesService {
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

  async getNotes(bookId) {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/notes`, {
      headers: this.getHeaders(true),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las notas");
    }

    const responseText = await response.text();
    console.log("Response text:", responseText);

    try {
      return JSON.parse(responseText);
    } catch (e) {
      throw new Error("Error al obtener las notas");
    }
  }

  async createNote(bookId, noteData) {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/notes`, {
      method: "POST",
      headers: this.getHeaders(true),
      credentials: "include",
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error creating note:", errorText);
      throw new Error("Error al crear la nota");
    }

    return response.json();
  }

  async deleteNote(bookId, noteId) {
    const response = await fetch(
      `${API_BASE_URL}/books/${bookId}/notes/${noteId}`,
      {
        method: "DELETE",
        headers: this.getHeaders(true),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error deleting note:", errorText);
      throw new Error("Error al eliminar la nota");
    }
  }
}

export const bookNotesService = new BookNotesService();
