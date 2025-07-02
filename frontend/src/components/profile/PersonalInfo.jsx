import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el perfil");
      }

      return response.json();
    },
    onSuccess: (updateUser) => {
      setUser(updateUser);
      localStorage.setItem("user_data", JSON.stringify(updateUser));
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error al actualizar el perfil:", error);
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUserMutation.mutate(form);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Información Básica */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4 bg-[#F8F9FA]">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-[#2C3E50]">
              Información Básica
            </CardTitle>
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-[#4DB6AC] hover:bg-[#4DB6AC] hover:text-white"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="text-green-600 hover:bg-green-100"
                  disabled={updateUserMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-1" />
                  {updateUserMutation.isPending ? "Guardando..." : "Guardar"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="text-red-600 hover:bg-red-100"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {[
            { label: "Nombre completo", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Fecha de nacimiento", name: "birthday", type: "date" },
            { label: "Ubicación", name: "location" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1 text-[#2C3E50]">
                {label}
              </label>
              {isEditing ? (
                <Input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="border-2 focus:border-[#4DB6AC]"
                />
              ) : (
                <p className="p-2 rounded bg-[#F8F9FA] text-[#2C3E50]">
                  {name === "birthday" && form[name]
                    ? new Date(form[name]).toLocaleDateString("es-ES")
                    : form[name]}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sobre mí */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4 bg-[#F8F9FA]">
          <CardTitle className="text-xl text-[#2C3E50]">Sobre mí</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#2C3E50]">
              Biografía
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border-2 rounded focus:border-[#4DB6AC] focus:outline-none"
              />
            ) : (
              <p className="p-2 rounded bg-[#F8F9FA] text-[#2C3E50]">
                {form.bio}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#2C3E50]">
              Género favorito
            </label>
            {isEditing ? (
              <Input
                name="favoriteGenre"
                value={form.favoriteGenre}
                onChange={handleChange}
                className="border-2 focus:border-[#4DB6AC]"
              />
            ) : (
              <p className="p-2 rounded bg-[#F8F9FA] text-[#2C3E50]">
                {form.favoriteGenre}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
