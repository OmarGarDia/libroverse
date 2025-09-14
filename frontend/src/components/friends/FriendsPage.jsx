import React, { useState, useEffect } from "react";
import { Navigation } from "../Navigation";
import { FriendsList } from "./FriendsList";
import { SearchUsers } from "./SearchUsers";
import { PendingRequests } from "./PendingRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Users, UserPlus, Clock } from "lucide-react";
import { friendshipService } from "../../services/friendshipService";
import { toast } from "sonner";

const FriendsPage = ({ isAuthenticated, userData, onLogout }) => {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadFriendsData();
    }
  }, [isAuthenticated]);

  const loadFriendsData = async () => {
    try {
      setLoading(true);
      const [friendsData, pendingData] = await Promise.all([
        friendshipService.getFriends(),
        friendshipService.getPendingRequests(),
      ]);

      setFriends(friendsData);
      setPendingRequests(pendingData);
    } catch (error) {
      toast.error("Error al cargar datos de amigos");
      console.error("Error loading friends data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFriendRequestSent = () => {
    toast.success("Solicitud de amistad enviada");
  };

  const handleRequestAccepted = async (friendshipId) => {
    try {
      await friendshipService.acceptFriendRequest(friendshipId);
      toast.success("Solicitud aceptada");
      loadFriendsData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Error al aceptar solicitud de amistad");
    }
  };

  const handleRequestRejected = async (friendshipId) => {
    try {
      await friendshipService.rejectFriendRequest(friendshipId);
      toast.success("Solicitud Rechazada");
      loadFriendsData();
    } catch (error) {
      toast.error("Error al rechazar solicitud");
    }
  };

  const handleFriendRemoved = async (friendId) => {
    try {
      await friendshipService.removeFriend(friendId);
      toast.success("Amistad eliminada");
      loadFriendsData();
    } catch (error) {
      toast.error("Error al eliminar amistad");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          isAuthenticated={false}
          userData={null}
          onLogout={onLogout}
          showLogin={true}
          onToggleAuth={() => {}}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">
            Inicia sesión para ver tus amigos
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={onLogout}
        showLogin={false}
        onToggleAuth={() => {}}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mis Amigos
          </h1>
          <p className="text-muted-foreground">
            Conecta con otros lectores y comparte tu pasión por los libros
          </p>
        </div>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Amigos ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Buscar usuarios
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Solicitudes ({pendingRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends">
            <FriendsList
              friends={friends}
              loading={loading}
              onRemoveFriend={handleFriendRemoved}
            />
          </TabsContent>

          <TabsContent value="search">
            <SearchUsers onFriendRequestSent={handleFriendRequestSent} />
          </TabsContent>

          <TabsContent value="requests">
            <PendingRequests
              requests={pendingRequests}
              loading={loading}
              onAcceptRequest={handleRequestAccepted}
              onRejectRequest={handleRequestRejected}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FriendsPage;
