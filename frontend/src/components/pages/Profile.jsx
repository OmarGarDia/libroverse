import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { PersonalInfo } from "@/components/profile/PersonalInfo";
import { ReadingStats } from "@/components/profile/ReadingStats";
import { FavoriteBooks } from "@/components/profile/FavoriteBooks";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { ActivityHistory } from "@/components/profile/ActivityHistory";

const Profile = ({ userData, isAuthenticated, onLogout }) => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo userData={userData} />;
      case "stats":
        return <ReadingStats userData={userData} />;
      case "favorites":
        return <FavoriteBooks userData={userData} />;
      case "settings":
        return <ProfileSettings userData={userData} />;
      case "activity":
        return <ActivityHistory userData={userData} />;
      default:
        return <PersonalInfo userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFBF6" }}>
      <Navigation
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={onLogout}
        showLogin={false}
        onToggleAuth={() => {}}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileHeader userData={userData} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
