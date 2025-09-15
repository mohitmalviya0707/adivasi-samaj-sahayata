import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import Navigation from "@/components/Navigation";

interface HeaderProps {
  userType: "citizen" | "officer" | null;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ userType, activeSection, onSectionChange }: HeaderProps) => {
  const { t } = useLanguage();

  return (
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
              <Navigation 
                userType={userType} 
                activeSection={activeSection} 
                onSectionChange={onSectionChange} 
              />
              <Badge variant="secondary" className="bg-government-green text-white">
                {userType === "citizen" ? t('header.citizen') : t('header.officer')}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;