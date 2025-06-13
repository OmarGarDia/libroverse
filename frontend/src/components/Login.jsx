import React, { useState } from "react";
import api from "../api/axios"; // Importa la instancia de Axios configurada

const Login = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Primero, obtenemos el token CSRF de Sanctum
      await api.get("/sanctum/csrf-cookie");

      // Luego, enviamos las credenciales de inicio de sesión
      await api.post("/login", {
        email,
        password,
      });

      // Si la petición es exitosa, el usuario está autenticado y la sesión está activa
      // Podemos limpiar los campos del formulario y llamar a la función de éxito
      setEmail("");
      setPassword("");
      onAuthSuccess(); // Llama a la función de callback si el inicio de sesión es exitoso
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        // Errores de validación de Laravel
        const messages = Object.values(err.response.data.errors).flat();
        setError(messages.join(", "));
      } else if (err.response) {
        setError(
          err.response.data.message ||
            "Credenciales incorrectas. Inténtalo de nuevo."
        );
      } else {
        setError(
          "Error de red. Asegúrate de que el backend de Laravel esté funcionando."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-warm-gray mt-10 transform transition-all duration-500 hover:shadow-3xl">
      {/* Fondo decorativo sutil (inspirado en el aro planetario) */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute w-64 h-64 bg-gold-accent opacity-10 rounded-full -top-16 -right-16 blur-3xl"></div>
        <div className="absolute w-48 h-48 bg-turquoise-accent opacity-5 rounded-full -bottom-16 -left-16 blur-3xl"></div>
      </div>

      <h2 className="relative z-10 text-4xl md:text-5xl font-lora font-extrabold text-indigo-deep text-center mb-8 leading-tight">
        Inicia Sesión en LibroVerse
      </h2>
      <p className="relative z-10 text-dark-gray-text text-center mb-8 font-open-sans">
        Accede a tu universo de historias.
      </p>
      {error && (
        <div
          className="relative z-10 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-md"
          role="alert"
        >
          <p className="font-bold">Error:</p>{" "}
          <p className="block sm:inline">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-dark-gray-text text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-5 py-3.5 border border-warm-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise-accent focus:border-transparent transition-all duration-200 placeholder-warm-gray text-dark-gray-text shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="tu.email@ejemplo.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-dark-gray-text text-sm font-semibold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-5 py-3.5 border border-warm-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise-accent focus:border-transparent transition-all duration-200 placeholder-warm-gray text-dark-gray-text shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Introduce tu contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-turquoise-accent to-blue-500 text-white text-xl px-6 py-3.5 rounded-full font-bold hover:from-turquoise-accent-dark hover:to-blue-600 transition duration-300 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
