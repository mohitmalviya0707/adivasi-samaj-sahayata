import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Layers, 
  Filter, 
  Search, 
  Home,
  TreePine,
  Droplets,
  Wheat,
  Users,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";

const MapVisualization = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Mock land data
  const landRecords = [
    {
      id: "PTT001",
      owner: "Ramesh Kumar", 
      village: "Bandipara",
      area: "2.5 acres",
      type: "Agricultural",
      status: "Approved",
      pattaNumber: "PTT/2024/001",
      coordinates: "23.5558° N, 87.2872° E"
    },
    {
      id: "PTT002", 
      owner: "Sunita Devi",
      village: "Kalyanpur", 
      area: "1.8 acres",
      type: "Residential",
      status: "Approved", 
      pattaNumber: "PTT/2024/002",
      coordinates: "23.5612° N, 87.2901° E"
    },
    {
      id: "PTT003",
      owner: "Arjun Singh",
      village: "Jhirania",
      area: "3.2 acres", 
      type: "Forest Rights",
      status: "Pending",
      pattaNumber: "PTT/2024/003",
      coordinates: "23.5489° N, 87.2845° E"
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Agricultural": return <Wheat className="h-4 w-4" />;
      case "Residential": return <Home className="h-4 w-4" />;
      case "Forest Rights": return <TreePine className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Land Records Map</h1>
          <p className="text-muted-foreground">Interactive map showing approved land allocations and Patta records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Map Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Land Type</label>
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Regions</SelectItem>
                    <SelectItem value="bandipara">Bandipara</SelectItem>
                    <SelectItem value="kalyanpur">Kalyanpur</SelectItem>
                    <SelectItem value="jhirania">Jhirania</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Search Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by Patta number..." className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Layers className="h-5 w-5" />
                <span>Map Layers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Satellite View</span>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Boundaries</span>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Water Bodies</span>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Forest Areas</span>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Approved Land</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Pending Approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Water Bodies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-700"></div>
                <span className="text-sm">Forest Area</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Display */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Interactive Map</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mock Map Interface */}
              <div className="relative h-96 bg-gradient-to-br from-green-100 via-green-50 to-blue-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-semibold text-lg">Interactive Map View</h3>
                    <p className="text-muted-foreground">
                      This would show an interactive map with approved land allocations
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Integration with mapping service (Google Maps/OpenStreetMap) would be implemented here
                    </p>
                  </div>
                  
                  {/* Mock Map Points */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Bandipara Village</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Jhirania Forest</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <span className="text-xs text-muted-foreground">Scale: 1:50,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Land Records Table */}
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
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(record.type)}
                    <div>
                      <h3 className="font-semibold">{record.owner}</h3>
                      <p className="text-sm text-muted-foreground">
                        {record.village} • {record.area} • Patta: {record.pattaNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Coordinates: {record.coordinates}
                      </p>
                    </div>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Home className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-muted-foreground">Total Pattas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Wheat className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">856</div>
            <div className="text-sm text-muted-foreground">Agricultural Land</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TreePine className="h-8 w-8 mx-auto mb-2 text-green-700" />
            <div className="text-2xl font-bold">234</div>
            <div className="text-sm text-muted-foreground">Forest Rights</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">2,890</div>
            <div className="text-sm text-muted-foreground">Beneficiaries</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapVisualization;