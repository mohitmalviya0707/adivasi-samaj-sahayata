import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, MapPin, FileText, Zap, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  onUserTypeSelect: (type: "citizen" | "officer") => void;
}

const HeroSection = ({ onUserTypeSelect }: HeroSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-government-blue via-government-orange to-government-green p-12 text-white">
        <div className="relative z-10 max-w-4xl">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
            {t('hero.badge')}
          </Badge>
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            {t('hero.title_part1')}
            <br />
            <span className="text-yellow-200">{t('hero.title_part2')}</span>
          </h1>
          <p className="mb-8 text-xl opacity-90 max-w-2xl">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-government-blue hover:bg-white/90 shadow-lg"
              onClick={() => onUserTypeSelect("citizen")}
            >
              <Users className="mr-2 h-5 w-5" />
              {t('hero.citizen_button')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-government-blue"
              onClick={() => onUserTypeSelect("officer")}
            >
              <Shield className="mr-2 h-5 w-5" />
              {t('hero.officer_button')}
            </Button>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/5"></div>
      </section>

      {/* Services Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-government-orange">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-government-orange" />
                <span>{t('services.land_rights')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('services.land_rights_desc')}
              </p>
              <Badge variant="secondary">Forest Rights Act</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-government-green">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-government-green" />
                <span>PM Kisan Yojana</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Direct benefit transfer for farmers with ₹6,000 annual support
              </p>
              <Badge variant="secondary">₹6,000/year</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-government-blue">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-government-blue" />
                <span>Jal Jeevan Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Clean drinking water connection for every tribal household
              </p>
              <Badge variant="secondary">Water Connection</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-muted/50 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-government-orange mb-2">15.2L+</div>
            <div className="text-sm text-muted-foreground">Applications Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-government-green mb-2">8.5L+</div>
            <div className="text-sm text-muted-foreground">Land Pattas Approved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-government-blue mb-2">25.8L+</div>
            <div className="text-sm text-muted-foreground">Beneficiaries Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.2%</div>
            <div className="text-sm text-muted-foreground">Digital Accuracy</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;