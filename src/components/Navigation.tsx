import { Button } from "@/components/ui/button";
import { MapPin, Users, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  userType: "citizen" | "officer";
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ userType, activeSection, onSectionChange }: NavigationProps) => {
  const { t } = useLanguage();

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
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={activeSection === item.id ? "default" : "ghost"}
          onClick={() => onSectionChange(item.id)}
          className="flex items-center space-x-2"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Button>
      ))}
    </nav>
  );
};

export default Navigation;