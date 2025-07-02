import { User, BarChart3, Heart, Settings, Activity } from "lucide-react";

export const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "personal", label: "Información Personal", icon: User },
    { id: "stats", label: "Estadísticas", icon: BarChart3 },
    { id: "favorites", label: "Favoritos", icon: Heart },
    { id: "settings", label: "Configuración", icon: Settings },
    { id: "activity", label: "Actividad", icon: Activity },
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
                ${
                  isActive
                    ? "border-[#4DB6AC] text-[#2C3E50]"
                    : "border-transparent text-gray-500 hover:text-[#4DB6AC] hover:border-gray-300"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
