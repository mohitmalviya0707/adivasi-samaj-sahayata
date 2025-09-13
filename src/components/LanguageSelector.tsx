import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const languages = [
    { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'od' as Language, name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'te' as Language, name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn' as Language, name: 'বাংলা', flag: '🇮🇳' }
  ];

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
      <SelectTrigger className="w-32 h-9 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-muted">
        <div className="flex items-center space-x-2">
          <Languages className="h-4 w-4" />
          <span className="text-sm">{currentLangData?.flag}</span>
        </div>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-background border shadow-lg z-[60]">
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="hover:bg-muted focus:bg-muted"
          >
            <div className="flex items-center space-x-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;