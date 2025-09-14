import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Clock, Check, BookOpen } from "lucide-react";
import { friendshipService } from "@/services/friendshipService";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

export const SearchUsers = ({ onFriendRequestSent }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingRequest, setSendingRequest] = useState({});

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      searchUsers(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  const searchUsers = async (query) => {
    try {
      setLoading(true);
      const results = await friendshipService.searchUsers(query);
      setSearchResults(results);
    } catch (error) {
      toast.error("Error al buscar usuarios");
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      setSendingRequest((prev) => ({ ...prev, [userId]: true }));
      await friendshipService.sendFriendRequest(userId);

      // Actualizar el estado local del usuario
      setSearchResults((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, friendship_status: "pending" } : user
        )
      );

      onFriendRequestSent();
    } catch (error) {
      toast.error(error.message || "Error al enviar solicitud");
    } finally {
      setSendingRequest((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const getActionButton = (user) => {
    const isLoading = sendingRequest[user.id];

    switch (user.friendship_status) {
      case "accepted":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Amigos
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pendiente
          </Badge>
        );
      default:
        return (
          <Button
            size="sm"
            onClick={() => handleSendRequest(user.id)}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <UserPlus className="h-3 w-3" />
            {isLoading ? "Enviando..." : "Añadir"}
          </Button>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar usuarios por nombre o nombre de usuario..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading && searchQuery && (
        <div className="text-center text-muted-foreground py-4">
          Buscando usuarios...
        </div>
      )}

      {searchResults.length === 0 && searchQuery && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No se encontraron usuarios
              </h3>
              <p>Intenta con otros términos de búsqueda.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground truncate">
                        {user.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        @{user.username}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {user.books_read || 0} libros leídos
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">{getActionButton(user)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
