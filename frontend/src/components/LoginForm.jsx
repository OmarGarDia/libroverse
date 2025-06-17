import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginData = {
        email,
        password,
      };

      const response = await authService.login(loginData);

      toast.success(response.message || "Inicio de sesión exitoso");
      onSuccess();
    } catch (error) {
      console.error("Error en el login", error);
      toast.error(
        error instanceof Error ? error.message : "Error al iniciar sesión"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" style={{ color: "#34495E" }}>
          Correo electrónico
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="h-12 text-base"
          style={{
            borderColor: "#7F8C8D",
            backgroundColor: "#FDFBF6",
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" style={{ color: "#34495E" }}>
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="h-12 text-base"
          style={{
            borderColor: "#7F8C8D",
            backgroundColor: "#FDFBF6",
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-base font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        style={{
          backgroundColor: "#4DB6AC",
          color: "#FDFBF6",
          border: "none",
        }}
        onMouseEnter={(e) => {
          const target = e.target;
          target.style.backgroundColor = "#45A49A";
        }}
        onMouseLeave={(e) => {
          const target = e.target;
          target.style.backgroundColor = "#4DB6AC";
        }}
      >
        {isLoading ? "Iniciando..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
