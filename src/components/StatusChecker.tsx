import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Phone, 
  Mail,
  Calendar,
  MapPin,
  FileText,
  Download
} from "lucide-react";

const StatusChecker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);

  // Mock application data
  const mockApplication = {
    id: "TB001234",
    name: "Ramesh Kumar",
    status: "under_review",
    progress: 65,
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-20",
    expectedCompletion: "2024-01-30",
    schemes: ["PM Kisan Yojana", "Jal Jeevan Mission"],
    currentStage: "Document Verification",
    nextAction: "Field Officer Visit",
    contactOfficer: {
      name: "Dr. Priya Singh",
      designation: "Assistant District Collector",
      phone: "+91-9876543210",
      email: "priya.singh@gov.in"
    },
    timeline: [
      { stage: "Application Submitted", date: "2024-01-15", status: "completed" },
      { stage: "Initial Review", date: "2024-01-17", status: "completed" },
      { stage: "Document Verification", date: "2024-01-20", status: "in_progress" },
      { stage: "Field Inspection", date: "2024-01-25", status: "pending" },
      { stage: "Final Approval", date: "2024-01-30", status: "pending" }
    ]
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResult(mockApplication);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "under_review": return "bg-blue-500";
      case "approved": return "bg-green-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
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
      {/* Search Section */}
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
          <p className="text-sm text-muted-foreground mt-2">
            Enter your application reference number to track the status
          </p>
        </CardContent>
      </Card>

      {/* Search Result */}
      {searchResult && (
        <div className="space-y-6">
          {/* Application Overview */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{searchResult.name}</CardTitle>
                  <p className="text-muted-foreground">Application ID: {searchResult.id}</p>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(searchResult.status)} text-white`}>
                    {searchResult.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchResult.progress}% Complete
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={searchResult.progress} className="h-3" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Submitted</p>
                      <p className="text-sm text-muted-foreground">{searchResult.submittedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">{searchResult.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Expected Completion</p>
                      <p className="text-sm text-muted-foreground">{searchResult.expectedCompletion}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Applied Schemes</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.schemes.map((scheme: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {scheme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-900">{searchResult.currentStage}</h4>
                    <p className="text-blue-700">Next: {searchResult.nextAction}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
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
                    <div>
                      <Badge 
                        variant={item.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          item.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : item.status === 'in_progress'
                            ? 'bg-blue-500 text-white'
                            : ''
                        }
                      >
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{searchResult.contactOfficer.name}</h4>
                    <p className="text-muted-foreground">{searchResult.contactOfficer.designation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{searchResult.contactOfficer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{searchResult.contactOfficer.email}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Officer
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Receipt</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Upload Documents</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Track Location</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help Section */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find your application or need assistance? Contact our support team.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusChecker;