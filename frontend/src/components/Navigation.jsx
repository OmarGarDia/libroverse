import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ChevronDown,
  User,
  Settings,
  MessageCircle,
  LogOut,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export const Navigation = ({
  isAuthenticated,
  userData,
  onLogout,
  showLogin,
  onToggleAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Explorar", href: "#" },
    { label: "Mis Libros", href: "#" },
    { label: "Amigos", href: "/amigos" },
    { label: "Comunidad", href: "#" },
  ];

  return (
    <nav
      className="w-full p-4 shadow-lg"
      style={{ backgroundColor: "#2C3E50" }}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3">
          <svg
            className="h-10 w-10 md:h-12 md:w-12"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="30" width="40" height="50" rx="5" fill="#FDFBF6" />
            <rect x="50" y="30" width="5" height="50" fill="#FDFBF6" />
            <path
              d="M55 30 L65 30 C70 35 70 75 65 80 L55 80 Z"
              fill="#4DB6AC"
            />
            <path
              d="M55 30 L45 30 C40 35 40 75 45 80 L55 80 Z"
              fill="#4DB6AC"
            />
            <path
              d="M65 55 C80 20 120 20 135 55 C120 90 80 90 65 55"
              stroke="#D4AF37"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="100" cy="35" r="4" fill="#D4AF37" />
          </svg>
          <span
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#FDFBF6" }}
          >
            Libro<span style={{ color: "#4DB6AC" }}>Verse</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-lg font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ color: "#FDFBF6" }}
              onMouseEnter={(e) => {
                e.target.style.color = "#4DB6AC";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#FDFBF6";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:block relative" ref={userMenuRef}>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:bg-opacity-20 hover:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400"
                style={{ color: "#FDFBF6" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#4DB6AC" }}
                >
                  <User className="w-4 h-4" style={{ color: "#FDFBF6" }} />
                </div>
                <span className="text-lg">
                  {userData ? userData.name.split(" ")[0] : "Usuario"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 rounded-lg shadow-xl py-2 z-50 border"
                  style={{
                    backgroundColor: "#FDFBF6",
                    borderColor: "#4DB6AC",
                    boxShadow: "0 10px 25px rgba(44, 62, 80, 0.3)",
                  }}
                >
                  <div
                    className="px-4 py-3 border-b"
                    style={{ borderColor: "#E8E8E8" }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {userData?.name || "Usuario"}
                    </p>
                    <p className="text-xs" style={{ color: "#7F8C8D" }}>
                      {userData?.email || "email@ejemplo.com"}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/perfil"
                      className="flex items-center w-full py-2 px-4 rounded-lg transition-colors duration-200"
                      style={{ color: "#4DB6AC" }}
                      onMouseEnter={(e) => {
                        const target = e.target;
                        target.style.backgroundColor = "#34495E";
                        target.style.color = "#4DB6AC";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target;
                        target.style.backgroundColor = "transparent";
                        target.style.color = "#4DB6AC";
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Mi Perfil
                    </Link>
                    <Link
                      to="/amigos"
                      className="flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200"
                      style={{ color: "#2C3E50" }}
                      onMouseEnter={(e) => {
                        const target = e.target;
                        target.style.backgroundColor =
                          "rgba(76, 182, 172, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target;
                        target.style.backgroundColor = "transparent";
                      }}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Users
                        className="w-4 h-4 mr-3"
                        style={{ color: "#4DB6AC" }}
                      />
                      Amigos
                    </Link>
                  </div>
                  <div
                    className="border-t py-1"
                    style={{ borderColor: "#E8E8E8" }}
                  >
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Button
              onClick={onToggleAuth}
              className="px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{
                backgroundColor: "#D4AF37",
                color: "#2C3E50",
                border: "none",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#B8941F")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#D4AF37")}
            >
              {showLogin ? "Registrarse" : "Iniciar Sesión"}
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" style={{ color: "#FDFBF6" }} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80"
              style={{ backgroundColor: "#2C3E50", border: "none" }}
            >
              ;
              <div className="flex flex-col space-y-6 pt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-lg font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    style={{ color: "#FDFBF6" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#34495E";
                      e.target.style.color = "#4DB6AC";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#FDFBF6";
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "#34495E" }}
                >
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div
                        className="px-4 py-2 mb-4"
                        style={{ color: "#FDFBF6" }}
                      >
                        <p className="font-semibold">
                          {userData?.name || "Usuario"}
                        </p>
                        <p className="text-sm opacity-75">
                          {userData?.email || "email@ejemplo.com"}
                        </p>
                      </div>

                      {[
                        { icon: User, label: "Mi Perfil", href: "/perfil" },
                        {
                          icon: Settings,
                          label: "Configuración",
                          href: "/configuracion",
                        },
                        {
                          icon: MessageCircle,
                          label: "Mensajes",
                          href: "/mensajes",
                        },
                        { icon: Users, label: "Amigos", href: "/amigos" },
                      ].map(({ icon: Icon, label, href }) => (
                        <Link
                          key={label}
                          to={href}
                          className="flex items-center w-full py-2 px-4 rounded-lg transition-colors duration-200"
                          style={{ color: "#FDFBF6" }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#34495E";
                            e.target.style.color = "#4DB6AC";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#FDFBF6";
                          }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {label}
                        </Link>
                      ))}

                      <Button
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                        variant="destructive"
                        className="w-full py-3 rounded-full font-semibold mt-4"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        onToggleAuth();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-full font-bold"
                      style={{ backgroundColor: "#D4AF37", color: "#2C3E50" }}
                    >
                      {showLogin ? "Registrarse" : "Iniciar Sesión"}
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
