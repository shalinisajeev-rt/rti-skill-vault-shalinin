
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, TrendingUp, Users } from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockSkills = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    description: "JavaScript library for building user interfaces",
    employeeCount: 15,
    averageLevel: 3.8,
    demand: "High"
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for server-side development",
    employeeCount: 12,
    averageLevel: 3.5,
    demand: "High"
  },
  {
    id: 3,
    name: "Python",
    category: "Backend",
    description: "High-level programming language",
    employeeCount: 18,
    averageLevel: 4.1,
    demand: "Medium"
  },
  {
    id: 4,
    name: "AWS",
    category: "Cloud",
    description: "Amazon Web Services cloud platform",
    employeeCount: 8,
    averageLevel: 3.2,
    demand: "High"
  },
  {
    id: 5,
    name: "Project Management",
    category: "Soft Skills",
    description: "Planning, executing, and closing projects",
    employeeCount: 6,
    averageLevel: 4.3,
    demand: "Medium"
  }
];

const SkillMatrix = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skills] = useState(mockSkills);

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "bg-blue-100 text-blue-800";
      case "Backend":
        return "bg-purple-100 text-purple-800";
      case "Cloud":
        return "bg-orange-100 text-orange-800";
      case "Soft Skills":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skill Matrix</h2>
          <p className="text-muted-foreground">
            Track and manage skills across your organization.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill) => (
          <Card key={skill.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <Badge className={getDemandColor(skill.demand)}>
                  {skill.demand} Demand
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getCategoryColor(skill.category)} variant="outline">
                  {skill.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{skill.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Employees</span>
                  </div>
                  <span className="font-medium">{skill.employeeCount}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span>Avg Level</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{skill.averageLevel}/5</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-3 h-3 rounded-full ${
                            star <= Math.round(skill.averageLevel)
                              ? "bg-yellow-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillMatrix;
