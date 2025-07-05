import React, { useState, useRef } from "react";
import { Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "../hooks/use-toast";
import { avatarService } from "@/services/avatarService";

export const AvatarUpload = ({ currentAvatar, userName, onAvatarChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de imagen válido",
        variant: "destructive",
      });
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "La imagen debe ser menor a 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Crear URL temporal para preview inmediato
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);

      // Subir al servidor
      const response = await avatarService.updateAvatar(file);

      // Actualizar con la URL real del servidor
      const serverAvatarUrl = response.user.avatar;
      if (serverAvatarUrl) {
        setPreviewUrl(serverAvatarUrl);
        onAvatarChange(serverAvatarUrl, response.user);
      }

      toast({
        title: "Avatar actualizado",
        description: "Tu foto de perfil se ha actualizado correctamente",
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      // Revertir preview en caso de error
      setPreviewUrl(currentAvatar || null);

      toast({
        title: "Error",
        description: error.message || "Error al subir el avatar",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <Avatar className="w-32 h-32 shadow-xl">
        <AvatarImage
          src={previewUrl || currentAvatar}
          alt={userName || "Avatar"}
        />
        <AvatarFallback
          className="text-2xl font-bold"
          style={{ backgroundColor: "#4DB6AC", color: "#FDFBF6" }}
        >
          {previewUrl ? null : <User className="w-16 h-16" />}
        </AvatarFallback>
      </Avatar>

      <Button
        size="icon"
        className="absolute bottom-2 right-2 rounded-full shadow-lg"
        style={{ backgroundColor: "#D4AF37", color: "#2C3E50" }}
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        {isUploading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
        ) : (
          <Camera className="w-4 h-4" />
        )}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
