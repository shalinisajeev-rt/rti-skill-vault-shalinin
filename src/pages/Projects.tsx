
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, Users } from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Building a modern e-commerce platform with React and Node.js",
    status: "Active",
    priority: "High",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    teamSize: 8,
    technologies: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Developing a secure mobile banking application",
    status: "Planning",
    priority: "Medium",
    startDate: "2024-03-01",
    endDate: "2024-09-15",
    teamSize: 6,
    technologies: ["React Native", "Express", "MongoDB"]
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    description: "Creating an advanced analytics dashboard for business intelligence",
    status: "Completed",
    priority: "Low",
    startDate: "2023-10-01",
    endDate: "2024-01-30",
    teamSize: 4,
    technologies: ["Python", "Django", "PostgreSQL"]
  }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects] = useState(mockProjects);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and track all projects in your organization.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <p className="text-muted-foreground mt-1">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">Start: {project.startDate}</p>
                    <p className="text-muted-foreground">End: {project.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team Size: {project.teamSize}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
