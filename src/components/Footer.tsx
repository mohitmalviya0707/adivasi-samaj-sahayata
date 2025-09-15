import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default Footer;