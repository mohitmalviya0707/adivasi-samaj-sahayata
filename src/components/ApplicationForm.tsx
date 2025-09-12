import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, MapPin, User, Phone, Mail, Calendar, Home } from "lucide-react";
import { toast } from "sonner";

const ApplicationForm = () => {
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const schemes = [
    {
      id: "pm_kisan",
      name: "PM Kisan Yojana",
      description: "₹6,000 annual financial benefit to farmers",
      benefits: "Direct bank transfer",
    },
    {
      id: "jal_jeevan",
      name: "Jal Jeevan Mission", 
      description: "Piped water supply to every household",
      benefits: "Clean water connection",
    },
    {
      id: "forest_rights",
      name: "Forest Rights Act",
      description: "Recognition of forest dwelling rights",
      benefits: "Land ownership rights",
    },
    {
      id: "scholarship",
      name: "Tribal Scholarship",
      description: "Educational support for tribal students",
      benefits: "Financial assistance",
    },
  ];

  const handleSchemeToggle = (schemeId: string) => {
    setSelectedSchemes(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const handleSubmit = () => {
    toast.success("Application submitted successfully! Reference ID: TB" + Date.now().toString().slice(-6));
    // Note: This would normally integrate with Supabase for actual data storage
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Personal Information</h3>
              <p className="text-muted-foreground">Please provide your basic details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number *</Label>
                <Input id="aadhar" placeholder="xxxx-xxxx-xxxx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input id="mobile" placeholder="+91-xxxxxxxxxx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
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
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Location Details</h3>
              <p className="text-muted-foreground">Select your administrative location</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="madhya_pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor="block">Block/Tehsil *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block1">Block 1</SelectItem>
                    <SelectItem value="block2">Block 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select village" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="village1">Village 1</SelectItem>
                    <SelectItem value="village2">Village 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gramPanchayat">Gram Panchayat *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gram panchayat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gp1">Gram Panchayat 1</SelectItem>
                    <SelectItem value="gp2">Gram Panchayat 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input id="pincode" placeholder="Enter PIN code" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea id="address" placeholder="Enter your complete postal address" />
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
                      ? 'border-primary shadow-lg bg-primary/5' 
                      : 'hover:shadow-md'
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

            {selectedSchemes.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Selected Schemes:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSchemes.map(id => {
                    const scheme = schemes.find(s => s.id === id);
                    return (
                      <Badge key={id} variant="default">
                        {scheme?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
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
                <CardContent className="p-6">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Aadhar Card</h4>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Tribal Certificate</h4>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Income Certificate</h4>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Bank Passbook</h4>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
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
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
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
            
            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;