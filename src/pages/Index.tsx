import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector, HeroSection, ApplicationForm, OfficerDashboard, StatusChecker, MapVisualization, ChatBot } from "@/AllComponents";

const Index = () => {
  const { t } = useLanguage();
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

  const citizenNavItems = [
    { id: "apply", label: t('nav.apply'), icon: FileText },
    { id: "status", label: t('nav.status'), icon: CheckCircle },
    { id: "map", label: t('nav.map'), icon: MapPin },
  ];

  const officerNavItems = [
    { id: "dashboard", label: t('nav.dashboard'), icon: Users },
    { id: "map", label: t('nav.approved_lands'), icon: MapPin },
  ];

  const navItems = userType === "citizen" ? citizenNavItems : officerNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-government-orange to-government-green flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">{t('header.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
          
            {userType && (
              <div className="flex items-center space-x-6">
                <nav className="flex items-center space-x-6">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      onClick={() => setActiveSection(item.id)}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  ))}
                </nav>
                <Badge variant="secondary" className="bg-government-green text-white">
                  {userType === "citizen" ? t('header.citizen') : t('header.officer')}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {renderSection()}
      </main>

      {/* Chat Bot */}
      {userType && <ChatBot />}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t('footer.quick_links')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>PM Kisan Yojana</p>
                <p>Jal Jeevan Mission</p>
                <p>Land Records</p>
                <p>Application Status</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>FAQs</p>
                <p>User Guide</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('footer.government')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Ministry of Tribal Affairs</p>
                <p>Digital India</p>
                <p>MyGov</p>
                <p>India Portal</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;