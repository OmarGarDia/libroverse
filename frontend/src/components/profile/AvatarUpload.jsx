import { useState, useRef } from "react";
import { Camera, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { useToast } from "../hooks/use-toast";
import { avatarService } from "../../services/avatarService";
import { useAuth } from "../../context/AuthContext";

export const AvatarUpload = ({ currentAvatar, userName, onAvatarChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const { user, setUser, refreshUser } = useAuth();

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;

    console.log("🖼️ Procesando avatar path:", avatarPath);

    if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
      console.log("✅ URL completa detectada:", avatarPath);
      return avatarPath;
    }

    if (avatarPath.includes("/storage/")) {
      const fullUrl = avatarPath.startsWith("http")
        ? avatarPath
        : `http://localhost:8000${avatarPath}`;
      console.log("🔧 URL con storage construida:", fullUrl);
      return fullUrl;
    }

    const fullUrl = `http://localhost:8000/storage/${avatarPath}`;
    console.log("🔧 URL completa construida:", fullUrl);
    return fullUrl;
  };

  const displayAvatar =
    previewUrl || getAvatarUrl(user?.avatar) || getAvatarUrl(currentAvatar);

  console.log("📸 AvatarUpload: Debug avatar URLs:", {
    userAvatar: user?.avatar,
    currentAvatar,
    previewUrl,
    displayAvatar,
    constructedUrl: getAvatarUrl(user?.avatar),
  });

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo de imagen válido",
        variant: "destructive",
      });
      return;
    }

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
      console.log("📸 AvatarUpload: Subiendo avatar...");

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);

      const response = await avatarService.updateAvatar(file);

      console.log("✅ AvatarUpload: Respuesta del servidor:", response);

      setPreviewUrl(null);

      if (response.user) {
        console.log(
          "🔄 AvatarUpload: Actualizando usuario en contexto:",
          response.user
        );
        setUser(response.user);
        await refreshUser();
      }

      const avatarUrl = getAvatarUrl(response.user.avatar);
      if (avatarUrl) {
        onAvatarChange(avatarUrl, response.user);
      }

      toast({
        title: "Avatar actualizado",
        description: "Tu foto de perfil se ha actualizado correctamente",
      });
    } catch (error) {
      console.error("❌ AvatarUpload: Error uploading avatar:", error);
      setPreviewUrl(null);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error al subir el avatar",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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
        {displayAvatar && (
          <AvatarImage
            src={displayAvatar}
            alt={userName || "Avatar"}
            onError={(e) => {
              console.error("❌ Error cargando avatar:", displayAvatar);
              e.currentTarget.style.display = "none";
            }}
            onLoad={() => {
              console.log("✅ Avatar cargado correctamente:", displayAvatar);
            }}
          />
        )}
        <AvatarFallback
          className="text-2xl font-bold"
          style={{ backgroundColor: "#4DB6AC", color: "#FDFBF6" }}
        >
          <User className="w-16 h-16" />
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
