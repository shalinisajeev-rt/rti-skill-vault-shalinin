
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone } from "lucide-react";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";

// Mock data - will be replaced with Supabase data
const initialMockEmployees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "John Doe",
    position: "Senior Frontend Developer",
    email: "john.doe@rti.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5 years",
    dateOfJoining: "2019-01-15"
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Jane Smith",
    position: "Product Manager",
    email: "jane.smith@rti.com",
    phone: "+1 (555) 234-5678",
    department: "Product",
    skills: ["Agile", "Scrum", "Analytics"],
    experience: "7 years",
    dateOfJoining: "2017-03-20"
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Mike Johnson",
    position: "Backend Developer",
    email: "mike.johnson@rti.com",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    skills: ["Python", "PostgreSQL", "AWS"],
    experience: "4 years",
    dateOfJoining: "2020-06-10"
  }
];

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(initialMockEmployees);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (newEmployeeData: any) => {
    const newEmployee = {
      id: employees.length + 1,
      employeeId: newEmployeeData.employeeId,
      name: newEmployeeData.employeeName,
      position: newEmployeeData.skill || "Not specified",
      email: newEmployeeData.email,
      phone: newEmployeeData.mobileNumber,
      department: "Not specified",
      skills: newEmployeeData.technology ? [newEmployeeData.technology] : [],
      experience: "Not specified",
      dateOfJoining: newEmployeeData.dateOfJoining.toISOString().split('T')[0]
    };

    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employee Directory</h2>
          <p className="text-muted-foreground">
            Manage and view all employees in your organization.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{employee.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{employee.position}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4" />
                  {employee.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  {employee.phone}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Department: {employee.department}</p>
                <p className="text-sm text-muted-foreground mb-2">Experience: {employee.experience}</p>
                <p className="text-sm text-muted-foreground mb-2">DOJ: {employee.dateOfJoining}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddEmployeeDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeDirectory;
