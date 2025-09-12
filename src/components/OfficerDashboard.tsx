import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar,
  Search,
  Filter,
  Eye,
  FileCheck,
  FileX
} from "lucide-react";
import { toast } from "sonner";

const OfficerDashboard = () => {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock application data
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
      schemes: ["Forest Rights"],
      status: "under_review",
      submittedDate: "2024-01-12",
      deadline: "2024-01-25",
      priority: "medium"
    },
    {
      id: "TB001236",
      name: "Arjun Singh",
      village: "Jhirania",
      schemes: ["PM Kisan", "Scholarship"],
      status: "approved",
      submittedDate: "2024-01-10",
      deadline: "2024-01-20",
      priority: "low"
    },
    {
      id: "TB001237",
      name: "Maya Patel",
      village: "Devgaon",
      schemes: ["Jal Jeevan"],
      status: "rejected",
      submittedDate: "2024-01-08",
      deadline: "2024-01-18",
      priority: "low"
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const handleApprove = (applicationId: string) => {
    toast.success(`Application ${applicationId} approved successfully!`);
  };

  const handleReject = (applicationId: string) => {
    toast.error(`Application ${applicationId} has been rejected.`);
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === "all" || app.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Officer Dashboard</h1>
          <p className="text-muted-foreground">Manage tribal affairs applications and approvals</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Deadline: {new Date().toLocaleDateString()}
            </span>
          </div>
          <Badge variant="secondary" className="bg-government-blue text-white">
            Regional Officer
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
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
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
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

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Due Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search applications..." className="pl-10" />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(application.status)}`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{application.name}</h3>
                      <Badge variant="outline" className={getPriorityColor(application.priority)}>
                        {application.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ID: {application.id} • {application.village} • 
                      Schemes: {application.schemes.join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {application.submittedDate} • Deadline: {application.deadline}
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
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
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
            <Button variant="outline" className="h-20 flex-col">
              <FileCheck className="h-6 w-6 mb-2" />
              Bulk Approve
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              Priority Queue
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Set Deadlines
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerDashboard;