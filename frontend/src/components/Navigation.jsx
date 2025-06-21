import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Navigation = ({
  isAuthenticated,
  userData,
  onLogout,
  showLogin,
  onToggleAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "#" },
    { label: "Explorar", href: "#" },
    { label: "Mis Libros", href: "#" },
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
        {/* Desktop Navigation*/}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
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
            </a>
          ))}
        </div>
        {/* Desktop Auth Section*/}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold" style={{ color: "#FDFBF6" }}>
                Hola, {userData ? userData.name.split(" ")[0] : "Usuario"}
              </span>
              <Button
                onClick={onLogout}
                variant="destructive"
                className="px-6 py-2 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <Button
              onClick={onToggleAuth}
              className="px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
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
              <div className="flex flex-col space-y-6 pt-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
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
                  </a>
                ))}

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "#34495E" }}
                >
                  {isAuthenticated ? (
                    <Button
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      variant="destructive"
                      className="w-full py-3 rounded-full font-semibold"
                    >
                      Cerrar Sesión
                    </Button>
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
