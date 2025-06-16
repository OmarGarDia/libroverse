export const WelcomeSection = () => {
  return (
    <div className="text-center mb-16 px-4">
      <svg
        className="h-24 w-24 md:h-32 md:w-32 mx-auto mb-8 drop-shadow-xl"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="30" width="40" height="50" rx="5" fill="#2C3E50" />
        <rect x="50" y="30" width="5" height="50" fill="#2C3E50" />
        <path d="M55 30 L65 30 C70 35 70 75 65 80 L55 80 Z" fill="#4DB6AC" />
        <path d="M55 30 L45 30 C40 35 40 75 45 80 L55 80 Z" fill="#4DB6AC" />
        <path
          d="M65 55 C80 20 120 20 135 55 C120 90 80 90 65 55"
          stroke="#D4AF37"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="100" cy="35" r="5" fill="#D4AF37" />
      </svg>

      <h1
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        style={{ color: "#2C3E50" }}
      >
        Libro<span style={{ color: "#4DB6AC" }}>Verse</span>
      </h1>

      <p
        className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
        style={{ color: "#34495E" }}
      >
        Tu universo de historias. Descubre, lee y comparte en una experiencia
        única de lectura.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#4DB6AC" }}
          ></div>
          <span style={{ color: "#7F8C8D" }}>Miles de libros</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#D4AF37" }}
          ></div>
          <span style={{ color: "#7F8C8D" }}>Comunidad activa</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#2C3E50" }}
          ></div>
          <span style={{ color: "#7F8C8D" }}>Lectura personalizada</span>
        </div>
      </div>
    </div>
  );
};
