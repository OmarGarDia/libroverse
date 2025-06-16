import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export const AuthSection = ({ showLogin, onAuthSuccess, onToggleAuth }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        className="shadow-2xl border-0"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <CardHeader className="text-center pb-6">
          <CardTitle
            className="text-2xl font-bold"
            style={{ color: "#2C3E50" }}
          >
            {showLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
          <CardDescription className="text-base" style={{ color: "#7F8C8D" }}>
            {showLogin
              ? "Accede a tu universo de historias"
              : "Únete a nuestra comunidad de lectores"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {showLogin ? (
            <LoginForm onSuccess={onAuthSuccess} />
          ) : (
            <RegisterForm onSuccess={onAuthSuccess} />
          )}

          <div className="text-center pt-4">
            <span style={{ color: "#7F8C8D" }}>
              {showLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            </span>
            <Button
              variant="link"
              onClick={onToggleAuth}
              className="ml-2 p-0 font-semibold"
              style={{ color: "#4DB6AC" }}
            >
              {showLogin ? "Crear Cuenta" : "Iniciar Sesión"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
