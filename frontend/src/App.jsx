import { useEffect, useState } from "react";
import "./index.css";
import api from "./api/axios";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Para alternar entre login y registro
  const [userData, setUserData] = useState(null); // Para almacenar datos del usuario

  // Función para verificar si el usuario está autenticado
  const checkAuthStatus = async () => {
    try {
      // Axios ya tiene la baseURL con /api, por lo que la solicitud será a /api/user
      const response = await api.get("/user");
      setUserData(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Usuario no autenticado:", error.message);
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  // Efecto para verificar el estado de autenticación al cargar la app
  useEffect(() => {
    // Usar useEffect directamente aquí
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout"); // Esta ruta se convierte en /api/logout
      setIsAuthenticated(false);
      setUserData(null);
      console.log("Sesión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cream-paper font-inter text-dark-gray-text flex flex-col items-center justify-start">
      {/* Barra de Navegación */}
      <nav className="w-full bg-indigo-deep p-4 shadow-lg rounded-b-xl flex justify-center items-center relative z-20">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          {/* Logo de LibroVerse (SVG) */}
          <a href="#" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8 md:h-10 md:w-10 text-cream-paper"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Icono del Libro-Planeta */}
              {/* Nota: Los 'fill' dentro del SVG usan valores hexadecimales directos, que tienen prioridad. */}
              {/* La clase 'text-cream-paper' en el SVG principal solo afectaría 'currentColor' */}
              <rect
                x="10"
                y="30"
                width="40"
                height="50"
                rx="5"
                fill="#2C3E50"
              />
              <rect x="50" y="30" width="5" height="50" fill="#2C3E50" />
              <path
                d="M55 30 L65 30 C70 35 70 75 65 80 L55 80 Z"
                fill="#FDFBF6"
              />
              <path
                d="M55 30 L45 30 C40 35 40 75 45 80 L55 80 Z"
                fill="#FDFBF6"
              />
              <path
                d="M65 55 C80 20 120 20 135 55 C120 90 80 90 65 55"
                stroke="#4DB6AC"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="100" cy="35" r="4" fill="#D4AF37" />
            </svg>
            <span className="text-cream-paper text-2xl md:text-3xl font-lora font-bold">
              Libro<span className="text-turquoise-accent">Verse</span>
            </span>
          </a>

          {/* Elementos de Navegación (para escritorio) */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-cream-paper text-lg font-semibold hover:text-turquoise-accent transition duration-200"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-cream-paper text-lg font-semibold hover:text-turquoise-accent transition duration-200"
            >
              Explorar
            </a>
            <a
              href="#"
              className="text-cream-paper text-lg font-semibold hover:text-turquoise-accent transition duration-200"
            >
              Mis Libros
            </a>
            <a
              href="#"
              className="text-cream-paper text-lg font-semibold hover:text-turquoise-accent transition duration-200"
            >
              Comunidad
            </a>
          </div>

          {/* Botón de Iniciar Sesión/Avatar (para escritorio) */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-cream-paper font-semibold">
                  Hola, {userData ? userData.name.split(" ")[0] : "Usuario"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full text-md font-semibold hover:bg-red-600 transition duration-200 shadow-md"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="bg-gold-accent text-indigo-deep px-6 py-2 rounded-full font-bold hover:bg-gold-accent-dark transition duration-200 shadow-md transform hover:scale-105"
              >
                {showLogin ? "Registrarse" : "Iniciar Sesión"}
              </button>
            )}
          </div>

          {/* Menú Hamburguesa (para móvil) */}
          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              className="text-cream-paper focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable (inicialmente oculto) */}
        <div
          id="mobile-menu"
          className="hidden md:hidden absolute top-full left-0 w-full bg-indigo-deep rounded-b-xl shadow-lg pb-4"
        >
          <a
            href="#"
            className="block text-cream-paper text-lg px-4 py-3 hover:bg-indigo-700 transition duration-200 border-t border-indigo-600"
          >
            Inicio
          </a>
          <a
            href="#"
            className="block text-cream-paper text-lg px-4 py-3 hover:bg-indigo-700 transition duration-200"
          >
            Explorar
          </a>
          <a
            href="#"
            className="block text-cream-paper text-lg px-4 py-3 hover:bg-indigo-700 transition duration-200"
          >
            Mis Libros
          </a>
          <a
            href="#"
            className="block text-cream-paper text-lg px-4 py-3 hover:bg-indigo-700 transition duration-200"
          >
            Comunidad
          </a>
          <div className="px-4 pt-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition duration-200 shadow-md"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="w-full bg-gold-accent text-indigo-deep px-6 py-3 rounded-full font-bold hover:bg-gold-accent-dark transition duration-200 shadow-md"
              >
                {showLogin ? "Registrarse" : "Iniciar Sesión"}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Contenido principal de la página */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-1">
        {isAuthenticated ? (
          // Vista para usuarios autenticados
          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-warm-gray">
            <h2 className="text-3xl font-lora font-bold text-indigo-deep mb-4">
              ¡Bienvenido a LibroVerse!
            </h2>
            <p className="text-lg text-dark-gray-text">
              Estás autenticado y listo para explorar el universo de historias.
            </p>
            {userData && (
              <p className="mt-4 text-warm-gray">
                Tus datos: Nombre: {userData.name}, Email: {userData.email}
              </p>
            )}
            <button
              onClick={checkAuthStatus} // Botón para re-verificar el estado de autenticación
              className="mt-6 bg-gold-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-gold-accent-dark transition duration-200 shadow-md transform hover:scale-105"
            >
              Actualizar Estado de Autenticación
            </button>
          </div>
        ) : (
          // Vista para usuarios NO autenticados (Landing Page con logo y formularios)
          <div className="flex flex-col items-center w-full max-w-4xl pt-2 pb-8">
            {" "}
            {/* Ajusta padding para espaciado */}
            {/* Sección del Logo y Eslogan en el Centro */}
            <div className="text-center mb-12">
              {" "}
              {/* Más margen inferior */}
              <svg
                className="h-20 w-20 md:h-28 md:w-28 text-indigo-deep mx-auto mb-6 drop-shadow-lg"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Icono del Libro-Planeta - Versión más grande para la landing */}
                <rect
                  x="10"
                  y="30"
                  width="40"
                  height="50"
                  rx="5"
                  fill="#2C3E50"
                />
                <rect x="50" y="30" width="5" height="50" fill="#2C3E50" />
                <path
                  d="M55 30 L65 30 C70 35 70 75 65 80 L55 80 Z"
                  fill="#FDFBF6"
                />
                <path
                  d="M55 30 L45 30 C40 35 40 75 45 80 L55 80 Z"
                  fill="#FDFBF6"
                />
                <path
                  d="M65 55 C80 20 120 20 135 55 C120 90 80 90 65 55"
                  stroke="#4DB6AC"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="35" r="4" fill="#D4AF37" />
              </svg>
              <h1 className="text-2xl md:text-5xl font-lora font-bold text-indigo-deep mb-4 leading-tight drop-shadow-md">
                Libro<span className="text-turquoise-accent">Verse</span>
              </h1>
              <p className="text-xl md:text-2xl font-open-sans text-dark-gray-text max-w-2xl mx-auto leading-relaxed">
                Tu universo de historias. Descubre, lee y comparte.
              </p>
            </div>
            {/* Contenedor de Formularios (Login/Register) */}
            <div className="flex justify-center w-full">
              {showLogin ? (
                <Login onAuthSuccess={checkAuthStatus} />
              ) : (
                <Register onAuthSuccess={checkAuthStatus} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Script para la lógica del menú hamburguesa (asegúrate de que esté después de los elementos HTML) */}
      <script>
        {`
          document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
              mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
              });
            }
          });
        `}
      </script>
    </div>
  );
}

export default App;
