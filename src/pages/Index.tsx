import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ApplicationForm from "@/components/ApplicationForm";
import OfficerDashboard from "@/components/OfficerDashboard";
import StatusChecker from "@/components/StatusChecker";
import MapVisualization from "@/components/MapVisualization";
import ChatBot from "@/components/ChatBot";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [userType, setUserType] = useState<"citizen" | "officer" | null>(null);

  const renderSection = () => {
    if (!userType) {
      return <HeroSection onUserTypeSelect={setUserType} />;
    }

    switch (activeSection) {
      case "apply":
        return <ApplicationForm />;
      case "dashboard":
        return <OfficerDashboard />;
      case "status":
        return <StatusChecker />;
      case "map":
        return <MapVisualization />;
      default:
        return <HeroSection onUserTypeSelect={setUserType} />;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header 
        userType={userType} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content */}
      <main className="container py-6">
        {renderSection()}
      </main>

      {/* Chat Bot */}
      {userType && <ChatBot />}

      <Footer />
    </div>
  );
};

export default Index;