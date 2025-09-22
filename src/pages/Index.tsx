import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LanguageSelector,
  HeroSection,
  ApplicationForm,
  OfficerDashboard,
  StatusChecker,
  MapVisualization,
  ChatBot,
} from "@/AllComponents";

const Index = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [userType, setUserType] = useState<"citizen" | "officer" | null>(null);

  const renderSection = () => {
    if (!userType || activeSection === "home") {
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
    { id: "apply", label: t("nav.apply"), icon: FileText },
    { id: "status", label: t("nav.status"), icon: CheckCircle },
    { id: "map", label: t("nav.map"), icon: MapPin },
  ];

  const officerNavItems = [
    { id: "dashboard", label: t("nav.dashboard"), icon: Users },
    { id: "map", label: t("nav.approved_lands"), icon: MapPin },
  ];

  const navItems = userType === "citizen" ? citizenNavItems : officerNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Left Side: Home Button + Logo */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Home Button */}
            {userType && (
              <Button
                variant="ghost"
                onClick={() => {
                  setActiveSection("home"); // hamesha home
                  setUserType(null); // officer ya citizen dono reset
                }}
                className="flex items-center space-x-1 text-sm md:text-base"
              >
                <Users className="h-4 w-4 md:h-5 md:w-5" />
                <span>Home</span>
              </Button>
            )}

            {/* Logo */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-government-orange to-government-green flex items-center justify-center">
              <Users className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-bold text-sm md:text-lg">{t("header.title")}</h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                {t("header.subtitle")}
              </p>
            </div>
          </div>

          {/* Right Side: Language Selector + Badge */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />

            {userType && (
              <Badge variant="secondary" className="bg-government-green text-white text-xs">
                {userType === "citizen" ? t("header.citizen") : t("header.officer")}
              </Badge>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {userType && (
          <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container">
              <nav className="flex items-center justify-around py-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => setActiveSection(item.id)}
                    className="flex flex-col items-center space-y-1 h-auto p-2 text-xs"
                    size="sm"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-6">{renderSection()}</main>

      {/* Chat Bot */}
      {userType && <ChatBot />}

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t("footer.quick_links")}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>PM Kisan Yojana</p>
                <p>Jal Jeevan Mission</p>
                <p>Land Records</p>
                <p>Application Status</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("footer.support")}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>FAQs</p>
                <p>User Guide</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("footer.government")}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Ministry of Tribal Affairs</p>
                <p>Digital India</p>
                <p>MyGov</p>
                <p>India Portal</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

