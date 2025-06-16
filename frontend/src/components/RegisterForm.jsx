import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

const RegisterForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (name && email && password) {
        toast.success("Usuario registrado exitosamente");
        onSuccess();
      } else {
        toast.error("Todos los campos son obligatorios");
      }
    } catch (error) {
      toast.error("Error al registrar el usuario");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name" style={{ color: "#34495E" }}>
          Nombre Completo
        </Label>
        <Input
          className="h-12 text-base"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre completo"
          required
          style={{ borderColor: "#7F8C8D", backgroundColor: "#FDFBF6" }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email" style={{ color: "#34495E" }}>
          Correo electrónico
        </Label>
        <Input
          id="register-email"
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
        <Label htmlFor="register-password" style={{ color: "#34495E" }}>
          Contraseña
        </Label>
        <Input
          id="register-password"
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
      <div className="space-y-2">
        <Label htmlFor="confirm-password" style={{ color: "#34495E" }}>
          Confirmar contraseña
        </Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          backgroundColor: "#D4AF37",
          color: "#2C3E50",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#B8941F";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#D4AF37";
        }}
      >
        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>
    </form>
  );
};

export default RegisterForm;
