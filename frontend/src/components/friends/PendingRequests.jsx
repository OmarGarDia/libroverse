import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const PendingRequests = ({
  requests,
  loading,
  onAcceptRequest,
  onRejectRequest,
}) => {
  const [processingRequest, setProcessingRequest] = useState({});

  const handleAccept = async (friendshipId) => {
    try {
      setProcessingRequest((prev) => ({
        ...prev,
        [friendshipId]: "accepting",
      }));
      await onAcceptRequest(friendshipId);
    } finally {
      setProcessingRequest((prev) => ({ ...prev, [friendshipId]: false }));
    }
  };

  const handleReject = async (friendshipId) => {
    try {
      setProcessingRequest((prev) => ({
        ...prev,
        [friendshipId]: "rejecting",
      }));
      await onRejectRequest(friendshipId);
    } finally {
      setProcessingRequest((prev) => ({ ...prev, [friendshipId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              No tienes solicitudes pendientes
            </h3>
            <p>
              Cuando alguien te envíe una solicitud de amistad, aparecerá aquí.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={request.user.avatar}
                    alt={request.user.name}
                  />
                  <AvatarFallback>
                    {request.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {request.user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    @{request.user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Te ha enviado una solicitud de amistad
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleAccept(request.id)}
                  disabled={processingRequest[request.id]}
                  className="flex items-center gap-1"
                >
                  <Check className="h-3 w-3" />
                  {processingRequest[request.id] === "accepting"
                    ? "Aceptando..."
                    : "Aceptar"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(request.id)}
                  disabled={processingRequest[request.id]}
                  className="flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  {processingRequest[request.id] === "rejecting"
                    ? "Rechazando..."
                    : "Rechazar"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
