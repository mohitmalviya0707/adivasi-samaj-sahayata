import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";

export const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);

  const schemes = [
    { id: "scheme1", name: "Scheme 1", description: "For financial aid", benefits: "₹10,000" },
    { id: "scheme2", name: "Scheme 2", description: "For education support", benefits: "Scholarship" },
    { id: "scheme3", name: "Scheme 3", description: "Healthcare benefit", benefits: "Free checkup" },
  ];

  const handleSchemeToggle = (id: string) => {
    setSelectedSchemes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    alert("Application submitted successfully!");
    // Aap yahan form data ko API ya backend me send kar sakte hain
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="Enter full name" required />
              </div>
              <div>
                <Label htmlFor="aadhar">Aadhar Number *</Label>
                <Input id="aadhar" placeholder="xxxx-xxxx-xxxx" maxLength={12} pattern="\d{12}" required />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input id="mobile" placeholder="10 digit mobile" maxLength={10} pattern="[6-9]\d{9}" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" required />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="state">State *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madhya_pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                    <SelectItem value="tripura">Tripura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="district1">District 1</SelectItem>
                    <SelectItem value="district2">District 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea id="address" placeholder="Enter complete address" required />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Select Government Schemes</h3>
              <p className="text-muted-foreground">Choose the benefits you want to apply for</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedSchemes.includes(scheme.id)
                      ? "border-primary shadow-lg bg-primary/5"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleSchemeToggle(scheme.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedSchemes.includes(scheme.id)}
                        onChange={() => handleSchemeToggle(scheme.id)}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{scheme.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                        <Badge variant="secondary">{scheme.benefits}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Upload Documents</h3>
              <p className="text-muted-foreground">Please upload required documents</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Aadhar Card</h4>
                  <Button variant="outline" size="sm">Choose File</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Tribal Certificate</h4>
                  <Button variant="outline" size="sm">Choose File</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <FileText className="h-6 w-6" />
            <span>New Application</span>
          </CardTitle>

          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <Button
              onClick={() =>
                currentStep < 4 ? setCurrentStep(currentStep + 1) : handleSubmit()
              }
            >
              {currentStep < 4 ? "Next" : "Submit Application"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// HeroSection Component
interface HeroSectionProps {
  onUserTypeSelect: (type: "citizen" | "officer") => void;
}

export const HeroSection = ({ onUserTypeSelect }: HeroSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-12">
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

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed for government officers, administrators, and tribal representatives — making FRA implementation transparent, data-driven, and efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-government-orange">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-6 w-6 text-government-orange" />
                <span>Interactive Map Layers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Instantly view land parcels with status filters – Approved, Pending, and Rejected.
              </p>
              <Badge variant="secondary">Land Visualization</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-government-green">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-government-green" />
                <span>Comprehensive Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track monthly claim processing, geographic coverage, and officer efficiency with clear visual charts.
              </p>
              <Badge variant="secondary">Analytics & Insights</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-government-blue">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TreePine className="h-6 w-6 text-government-blue" />
                <span>Community Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Understand distribution of Gond, Baiga, Muria, Cork and other tribes through intuitive visuals.
              </p>
              <Badge variant="secondary">Tribal Analytics</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileCheck className="h-6 w-6 text-purple-500" />
                <span>Decision Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Streamlined workflow diagrams help officers validate claims, manage documents, and improve turnaround time.
              </p>
              <Badge variant="secondary">Workflow Optimization</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-indigo-500" />
                <span>Scalable Architecture</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Works as a standalone web app or can integrate with existing FRA systems for real-time analytics.
              </p>
              <Badge variant="secondary">Enterprise Ready</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-emerald-500" />
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
        </div>
      </section>

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

// LanguageSelector Component
export const LanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  const languages = [
    { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'od' as Language, name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'te' as Language, name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn' as Language, name: 'বাংলা', flag: '🇮🇳' },
    { code: 'ta' as Language, name: 'தமிழ்', flag: '🇮🇳' }, { code: 'ml' as Language, name: 'മലയാളം', flag: '🇮🇳' }, { code: 'kn' as Language, name: 'ಕನ್ನಡ', flag: '🇮🇳' }, { code: 'gu' as Language, name: 'ગુજરાતી', flag: '🇮🇳' }, { code: 'mr' as Language, name: 'मराठी', flag: '🇮🇳' }, { code: 'pa' as Language, name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }, { code: 'as' as Language, name: 'অসমীয়া', flag: '🇮🇳' },
    
  ];

  return (
    <Select value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
      <SelectTrigger className="w-32 h-9 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-muted">
        <div className="flex items-center space-x-2">
          <Languages className="h-4 w-4" />
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

// OfficerDashboard Component
export const OfficerDashboard = () => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const applications = [
    {
      id: "TB001234",
      name: "Ramesh Kumar",
      village: "Bandipara",
      schemes: ["PM Kisan", "Jal Jeevan"],
      status: "pending",
      submittedDate: "2024-01-15",
      deadline: "2024-01-30",
      priority: "high"
    },
    {
      id: "TB001235", 
      name: "Sunita Devi",
      village: "Kalyanpur",
      schemes: ["Forest Rights Act 2006"],
      status: "under_review",
      submittedDate: "2024-01-12",
      deadline: "2024-01-25",
      priority: "medium",
      landArea: "2.5 acres",
      landType: "Individual Forest Rights"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "under_review": return "bg-blue-500";
      case "approved": return "bg-green-500"; 
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleApprove = (applicationId: string) => {
    toast.success(`Application ${applicationId} approved successfully!`);
  };

  const handleReject = (applicationId: string) => {
    toast.error(`Application ${applicationId} has been rejected.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Officer Dashboard</h1>
          <p className="text-muted-foreground">Manage tribal affairs applications and approvals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">186</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(application.status)}`} />
                  <div>
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ID: {application.id} • {application.village}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {application.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(application.id)}
                      >
                        <FileCheck className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(application.id)}
                      >
                        <FileX className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


// add 
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, FileX, CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

export const OfficerDashboard = () => {
  const [applications] = useState([
    { id: "TB001234", name: "Ramesh Kumar", village: "Bandipara", state: "Madhya Pradesh", caste: "Gond", schemes: ["PM Kisan", "Jal Jeevan"], status: "pending", priority: "high", documents: ["Aadhar", "Tribal Certificate"] },
    { id: "TB001235", name: "Sunita Devi", village: "Kalyanpur", state: "Odisha", caste: "Cork", schemes: ["Forest Rights Act 2006"], status: "under_review", priority: "medium", documents: ["Aadhar"] },
    { id: "TB001236", name: "Raju Patel", village: "Chhota Nagpur", state: "Telangana", caste: "Gond", schemes: ["PM Kisan"], status: "approved", priority: "low", documents: ["Aadhar", "Tribal Certificate", "Land Document"] },
    { id: "TB001237", name: "Sita Devi", village: "Bandipara", state: "Madhya Pradesh", caste: "Cork", schemes: ["Pradhan Mantri Nasal Biome Yojana"], status: "rejected", priority: "high", documents: ["Aadhar"] }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "under_review": return "bg-blue-500";
      case "approved": return "bg-green-500"; 
      case "rejected": return "bg-red-500";
      case "fraud": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const handleApprove = (id: string) => toast.success(`Application ${id} approved successfully!`);
  const handleReject = (id: string) => toast.error(`Application ${id} rejected!`);

  // Prepare data for bar chart (state-wise)
  const states = Array.from(new Set(applications.map(a => a.state)));
  const barData = states.map(state => {
    const apps = applications.filter(a => a.state === state);
    return {
      state,
      pending: apps.filter(a => a.status === "pending").length,
      approved: apps.filter(a => a.status === "approved").length,
      rejected: apps.filter(a => a.status === "rejected").length,
      fraud: apps.filter(a => a.status === "fraud").length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Officer Dashboard</h1>
          <p className="text-muted-foreground">Manage tribal affairs applications and approvals</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status==="pending").length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status==="approved").length}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <FileX className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status==="rejected").length}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <FileCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status==="fraud").length}</p>
              <p className="text-sm text-muted-foreground">Fraud</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State-wise Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>State-wise Applications</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pending" fill="#facc15" />
              <Bar dataKey="approved" fill="#22c55e" />
              <Bar dataKey="rejected" fill="#ef4444" />
              <Bar dataKey="fraud" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {applications.map(a => (
            <div key={a.id} className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
              <div>
                <p className="font-semibold">{a.name} ({a.caste})</p>
                <p className="text-sm text-muted-foreground">
                  {a.state} - {a.village} | Status: <span className={`font-bold ${getStatusColor(a.status)}`}>{a.status}</span> | Priority: {a.priority}
                </p>
                <p className="text-sm">Schemes: {a.schemes.join(", ")}</p>
                <p className="text-sm">Documents: {a.documents.join(", ")}</p>
              </div>
              <div className="flex space-x-2">
                {a.status === "pending" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleApprove(a.id)}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(a.id)}>Reject</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};


// StatusChecker Component
export const StatusChecker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  const mockApplication = {
    id: "TB001234",
    name: "Ramesh Kumar",
    status: "under_review",
    progress: 65,
    submittedDate: "2024-01-15",
    schemes: ["Forest Rights Act 2006", "Jal Jeevan Mission"],
    currentStage: "Land Survey & Verification",
    timeline: [
      { stage: "Application Submitted", date: "2024-01-15", status: "completed" },
      { stage: "Initial Review", date: "2024-01-17", status: "completed" },
      { stage: "Land Survey & Verification", date: "2024-01-20", status: "in_progress" },
      { stage: "Gram Sabha Approval", date: "2024-01-25", status: "pending" }
    ]
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResult(mockApplication);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress": return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-6 w-6" />
            <span>Check Application Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter Application ID (e.g., TB001234)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{searchResult.name}</CardTitle>
                  <p className="text-muted-foreground">Application ID: {searchResult.id}</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-500 text-white">
                    UNDER REVIEW
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchResult.progress}% Complete
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={searchResult.progress} className="h-3" />
              
              <div className="mt-4 bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Applied Schemes</h4>
                <div className="flex flex-wrap gap-2">
                  {searchResult.schemes.map((scheme: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {scheme}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResult.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.stage}</h4>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// MapVisualization Component
export const MapVisualization = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const landRecords = [
    {
      id: "PTT001",
      owner: "Ramesh Kumar", 
      village: "Bandipara",
      area: "2.5 acres",
      type: "Agricultural",
      status: "Approved",
      pattaNumber: "PTT/2024/001"
    },
    {
      id: "PTT002", 
      owner: "Sunita Devi",
      village: "Kalyanpur", 
      area: "1.8 acres",
      type: "Residential",
      status: "Approved", 
      pattaNumber: "PTT/2024/002"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Land Records Map</h1>
        <p className="text-muted-foreground">Interactive map showing approved land allocations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Map Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="forest">Forest Rights</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Interactive Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveMap />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Land Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {landRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(record.status)}`} />
                  <div>
                    <h3 className="font-semibold">{record.owner}</h3>
                    <p className="text-sm text-muted-foreground">
                      {record.village} • {record.area} • Patta: {record.pattaNumber}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(record.status)} text-white`}>
                    {record.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Locate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ChatBot Component
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatBot = () => {
  const { currentLanguage: globalLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot', 
        content: "I can help you with Forest Rights Act 2006 related queries. Please ask your question.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-government-orange hover:bg-government-orange/90 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">FRA Help Desk</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 px-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
