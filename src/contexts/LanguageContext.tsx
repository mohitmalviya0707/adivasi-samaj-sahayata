import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'hi' | 'en' | 'od' | 'te' | 'bn';

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translations = {
  // Header
  'header.title': {
    hi: 'जनजातीय मामले पोर्टल',
    en: 'Tribal Affairs Portal',
    od: 'ଆଦିବାସୀ ବିଷୟ ପୋର୍ଟାଲ',
    te: 'గిరిజన వ్యవహారాల పోర୍టల్',
    bn: 'উপজাতীয় বিষয়ক পোর্টাল'
  },
  'header.subtitle': {
    hi: 'भारत सरकार',
    en: 'Government of India',
    od: 'ଭାରତ ସରକାର',
    te: 'భారత ప్రభుత్వం',
    bn: 'ভারত সরকার'
  },
  'header.citizen': {
    hi: 'नागरिक',
    en: 'Citizen',
    od: 'ନାଗରିକ',
    te: 'పౌరుడు',
    bn: 'নাগরিক'
  },
  'header.officer': {
    hi: 'अधिकारी',
    en: 'Officer',
    od: 'ଅଧିକାରୀ',
    te: 'అధికారి',
    bn: 'কর্মকর্তা'
  },

  // Navigation
  'nav.apply': {
    hi: 'लाभ के लिए आवेदन करें',
    en: 'Apply for Benefits',
    od: 'ସୁବିଧା ପାଇଁ ଆବେଦନ କରନ୍ତୁ',
    te: 'ప్రయోజనాల కోసం దరఖాస్తు చేయండి',
    bn: 'সুবিধার জন্য আবেদন করুন'
  },
  'nav.status': {
    hi: 'स्थिति जांचें',
    en: 'Check Status',
    od: 'ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ',
    te: 'స్థితిని తనిఖీ చేయండి',
    bn: 'অবস্থা পরীক্ষা করুন'
  },
  'nav.map': {
    hi: 'भूमि रिकॉर्ड',
    en: 'Land Records',
    od: 'ଜମି ରେକର୍ଡ',
    te: 'భూమి రికార్డులు',
    bn: 'ভূমি রেকর্ড'
  },
  'nav.dashboard': {
    hi: 'डैशबोर्ड',
    en: 'Dashboard',
    od: 'ଡ୍ୟାସବୋର୍ଡ',
    te: 'డాష్‌బోర్డ్',
    bn: 'ড্যাশবোর্ড'
  },
  'nav.approved_lands': {
    hi: 'अनुमोदित भूमि',
    en: 'Approved Lands',
    od: 'ଅନୁମୋଦିତ ଜମି',
    te: 'ఆమోదించిన భూములు',
    bn: 'অনুমোদিত ভূমি'
  },

  // Hero Section
  'hero.badge': {
    hi: 'भारत सरकार की पहल',
    en: 'Government of India Initiative',
    od: 'ଭାରତ ସରକାରଙ୍କ ପଦକ୍ଷେପ',
    te: 'భారత ప్రభుత్వ చొరవ',
    bn: 'ভারত সরকারের উদ্যোগ'
  },
  'hero.title_part1': {
    hi: 'जनजातीय मामले',
    en: 'Tribal Affairs',
    od: 'ଆଦିବାସୀ ବିଷୟ',
    te: 'గిరిజన వ్యవహారాలు',
    bn: 'উপজাতীয় বিষয়াবলি'
  },
  'hero.title_part2': {
    hi: 'डिजिटल पोर्टल',
    en: 'Digital Portal',
    od: 'ଡିଜିଟାଲ୍ ପୋର୍ଟାଲ',
    te: 'డిజిటల్ పోర్టల్',
    bn: 'ডিজিটাল পোর্টাল'
  },
  'hero.description': {
    hi: 'डिजिटल गवर्नेंस के माध्यम से जनजातीय समुदायों को सशक्त बनाना। भूमि अधिकार, सरकारी लाभ के लिए आवेदन करें और अपने आवेदन को सहजता से ट्रैक करें।',
    en: 'Empowering tribal communities through digital governance. Apply for land rights, government benefits, and track your applications seamlessly.',
    od: 'ଡିଜିଟାଲ୍ ଶାସନ ମାଧ୍ୟମରେ ଆଦିବାସୀ ସମ୍ପ୍ରଦାୟକୁ ସଶକ୍ତ କରିବା। ଜମି ଅଧିକାର, ସରକାରୀ ସୁବିଧା ପାଇଁ ଆବେଦନ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ଆବେଦନକୁ ସହଜରେ ଟ୍ରାକ୍ କରନ୍ତୁ।',
    te: 'డిజిటల్ పాలన ద్వారా గిరిజన సమాజాలను శక్తివంతం చేయడం. భూమి హక్కులు, ప్రభుత్వ ప్రయోజనాల కోసం దరఖాస్తు చేసుకోండి మరియు మీ దరఖాస్తులను సజావుగా ట్రాక్ చేయండి.',
    bn: 'ডিজিটাল শাসনের মাধ্যমে উপজাতীয় সম্প্রদায়ের ক্ষমতায়ন। ভূমি অধিকার, সরকারি সুবিধার জন্য আবেদন করুন এবং আপনার আবেদনগুলি নির্বিঘ্নে ট্র্যাক করুন।'
  },
  'hero.citizen_button': {
    hi: 'मैं एक नागरिक हूं',
    en: "I'm a Citizen",
    od: 'ମୁଁ ଜଣେ ନାଗରିକ',
    te: 'నేను ఒక పౌరుడను',
    bn: 'আমি একজন নাগরিক'
  },
  'hero.officer_button': {
    hi: 'मैं एक अधिकारी हूं',
    en: "I'm an Officer",
    od: 'ମୁଁ ଜଣେ ଅଧିକାରୀ',
    te: 'నేను ఒక అధికారిని',
    bn: 'আমি একজন কর্মকর্তা'
  },

  // Services
  'services.title': {
    hi: 'उपलब्ध सेवाएं',
    en: 'Available Services',
    od: 'ଉପଲବ୍ଧ ସେବା',
    te: 'అందుబాటులో ఉన్న సేవలు',
    bn: 'উপলব্ধ সেবাসমূহ'
  },
  'services.description': {
    hi: 'जनजातीय समुदायों के लिए विशेष रूप से डिज़ाइन की गई सरकारी योजनाओं और सेवाओं का उपयोग करें',
    en: 'Access government schemes and services designed specifically for tribal communities',
    od: 'ଆଦିବାସୀ ସମ୍ପ୍ରଦାୟ ପାଇଁ ବିଶେଷ ଭାବରେ ଡିଜାଇନ୍ ହୋଇଥିବା ସରକାରୀ ଯୋଜନା ଏବଂ ସେବା ଗୁଡିକୁ ପ୍ରବେଶ କରନ୍ତୁ',
    te: 'గిరిజన సమాజాల కోసం ప్రత్యేకంగా రూపొందించిన ప్రభుత్వ పథకాలు మరియు సేవలను యాక్సెస్ చేయండి',
    bn: 'উপজাতীয় সম্প্রদায়ের জন্য বিশেষভাবে ডিজাইন করা সরকারি স্কিম এবং সেবা অ্যাক্সেস করুন'
  },
  'services.land_rights': {
    hi: 'भूमि अधिकार',
    en: 'Land Rights',
    od: 'ଜମି ଅଧିକାର',
    te: 'భూమి హక్కులు',
    bn: 'ভূমি অধিকার'
  },
  'services.land_rights_desc': {
    hi: 'भूमि पट्टा, स्वामित्व दस्तावेज और भूमि रिकॉर्ड सत्यापन के लिए आवेदन करें',
    en: 'Apply for land patta, ownership documents, and land record verification',
    od: 'ଜମି ପଟ୍ଟା, ମାଲିକାନା ଦଲିଲ, ଏବଂ ଜମି ରେକର୍ଡ ଯାଞ୍ଚ ପାଇଁ ଆବେଦନ କରନ୍ତୁ',
    te: 'భూమి పట్టా, యాజమాన్య పత్రాలు మరియు భూమి రికార్డు ధృవీకరణ కోసం దరఖాస్తు చేయండి',
    bn: 'ভূমি পাট্টা, মালিকানা নথি এবং ভূমি রেকর্ড যাচাইয়ের জন্য আবেদন করুন'
  },

  // Footer
  'footer.quick_links': {
    hi: 'त्वरित लिंक',
    en: 'Quick Links',
    od: 'ଶୀଘ୍ର ଲିଙ୍କ',
    te: 'త్వరిత లింకులు',
    bn: 'দ্রুত লিংক'
  },
  'footer.support': {
    hi: 'सहायता',
    en: 'Support',
    od: 'ସହାୟତା',
    te: 'మద్దతు',
    bn: 'সহায়তা'
  },
  'footer.government': {
    hi: 'सरकार',
    en: 'Government',
    od: 'ସରକାର',
    te: 'ప్రభుత్వం',
    bn: 'সরকার'
  },
  'footer.copyright': {
    hi: '© 2024 भारत सरकार, जनजातीय मामलों का मंत्रालय। सभी अधिकार सुरक्षित।',
    en: '© 2024 Government of India, Ministry of Tribal Affairs. All rights reserved.',
    od: '© ୨୦୨୪ ଭାରତ ସରକାର, ଆଦିବାସୀ ବିଷୟ ମନ୍ତ୍ରଣାଳୟ। ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।',
    te: '© 2024 భారత ప్రభుత్వం, గిరిజన వ్యవహారాల మంత్రిత్వ శాఖ. అన్ని హక్కులు రక్షించబడ్డాయి.',
    bn: '© ২০২৪ ভারত সরকার, উপজাতীয় বিষয়ক মন্ত্রণালয়। সমস্ত অধিকার সংরক্ষিত।'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};