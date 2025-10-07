import { authService } from "./authService";

const API_BASE_URL = "http://localhost:8000/api";

export const friendshipService = {
  async getFriends() {
    try {
      console.log("Making request to:", `${API_BASE_URL}/friends`);
      console.log("Headers:", authService.getHeaders(true));

      const response = await fetch(`${API_BASE_URL}/friends`, {
        headers: authService.getHeaders(true),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Friends data:", data);
      return data;
    } catch (error) {
      console.error("Error getting friends:", error);
      throw error;
    }
  },

  /**
   * Buscar usuarios
   */
  async searchUsers(query) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/friends/search?q=${encodeURIComponent(query)}`,
        {
          headers: authService.getHeaders(true),
        }
      );

      if (!response.ok) {
        throw new Error("Error al buscar usuarios");
      }

      return await response.json();
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  },

  /**
   * Enviar solicitud de amistad
   */
  async sendFriendRequest(friendId) {
    try {
      const response = await fetch(`${API_BASE_URL}/friends/request`, {
        method: "POST",
        headers: authService.getHeaders(true),
        body: JSON.stringify({ friend_id: friendId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al enviar solicitud");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending friend request:", error);
      throw error;
    }
  },

  /**
   * Aceptar solicitud de amistad
   */
  async acceptFriendRequest(friendshipId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/friends/accept/${friendshipId}`,
        {
          method: "POST",
          headers: authService.getHeaders(true),
        }
      );

      if (!response.ok) {
        throw new Error("Error al aceptar solicitud");
      }

      return await response.json();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      throw error;
    }
  },

  /**
   * Rechazar solicitud de amistad
   */
  async rejectFriendRequest(friendshipId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/friends/reject/${friendshipId}`,
        {
          method: "POST",
          headers: authService.getHeaders(true),
        }
      );

      if (!response.ok) {
        throw new Error("Error al rechazar solicitud");
      }

      return await response.json();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      throw error;
    }
  },

  /**
   * Obtener solicitudes pendientes
   */
  async getPendingRequests() {
    try {
      console.log("Making request to:", `${API_BASE_URL}/friends/pending`);

      const response = await fetch(`${API_BASE_URL}/friends/pending`, {
        headers: authService.getHeaders(true),
      });

      console.log("Pending requests response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Pending requests error:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Pending requests data:", data);
      return data;
    } catch (error) {
      console.error("Error getting pending requests:", error);
      throw error;
    }
  },

  /**
   * Eliminar amistad
   */
  async removeFriend(friendId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/friends/remove/${friendId}`,
        {
          method: "DELETE",
          headers: authService.getHeaders(true),
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar amistad");
      }

      return await response.json();
    } catch (error) {
      console.error("Error removing friend:", error);
      throw error;
    }
  },
};
