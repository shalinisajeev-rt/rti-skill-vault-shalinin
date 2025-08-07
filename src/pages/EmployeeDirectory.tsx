
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { DeleteEmployeeDialog } from "@/components/employees/DeleteEmployeeDialog";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  employee_id: string;
  employee_name: string;
  date_of_joining: string;
  email: string;
  mobile_number: string;
  role?: string;
  team_project_lead?: string;
  project?: string;
  technology?: string;
  skill?: string;
  comments?: string;
}

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Fetch employees from Supabase
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching employees:', error);
        toast({
          title: "Error",
          description: "Failed to fetch employees",
          variant: "destructive",
        });
        return;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('employees-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employees'
        },
        () => {
          console.log('Employee data changed, refetching...');
          fetchEmployees();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.skill && employee.skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.technology && employee.technology.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.role && employee.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddEmployee = async (newEmployeeData: any) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          employee_id: newEmployeeData.employeeId,
          employee_name: newEmployeeData.employeeName,
          date_of_joining: newEmployeeData.dateOfJoining.toISOString().split('T')[0],
          email: newEmployeeData.email,
          mobile_number: newEmployeeData.mobileNumber,
          role: newEmployeeData.role || null,
          team_project_lead: newEmployeeData.teamProjectLead || null,
          project: newEmployeeData.project || null,
          technology: newEmployeeData.technology || null,
          skill: newEmployeeData.skill || null,
          comments: newEmployeeData.comments || null,
        }])
        .select();

      if (error) {
        console.error('Error adding employee:', error);
        toast({
          title: "Error",
          description: `Failed to add employee: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Employee added successfully",
      });

      fetchEmployees();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateEmployee = async (employeeId: string, updatedEmployeeData: any) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update({
          employee_id: updatedEmployeeData.employeeId,
          employee_name: updatedEmployeeData.employeeName,
          date_of_joining: updatedEmployeeData.dateOfJoining.toISOString().split('T')[0],
          email: updatedEmployeeData.email,
          mobile_number: updatedEmployeeData.mobileNumber,
          role: updatedEmployeeData.role || null,
          team_project_lead: updatedEmployeeData.teamProjectLead || null,
          project: updatedEmployeeData.project || null,
          technology: updatedEmployeeData.technology || null,
          skill: updatedEmployeeData.skill || null,
          comments: updatedEmployeeData.comments || null,
        })
        .eq('id', employeeId);

      if (error) {
        console.error('Error updating employee:', error);
        toast({
          title: "Error",
          description: `Failed to update employee: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Employee updated successfully",
      });

      setEditEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', employeeToDelete.id);

      if (error) {
        console.error('Error deleting employee:', error);
        toast({
          title: "Error",
          description: `Failed to delete employee: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });

      setEmployeeToDelete(null);
      setIsDeleteDialogOpen(false);
      setSelectedEmployees(prev => prev.filter(id => id !== employeeToDelete.id));
      fetchEmployees();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditEmployee(employee);
    setIsAddDialogOpen(true);
  };

  const handleDeleteEmployeeClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditEmployee(null);
    }
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

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        {selectedEmployees.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedEmployees.length} selected
            </span>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeTable 
            employees={filteredEmployees} 
            isLoading={isLoading}
            selectedEmployees={selectedEmployees}
            onEmployeeSelect={handleEmployeeSelect}
            onSelectAll={handleSelectAll}
            onEditEmployee={handleEditEmployee}
            onDeleteEmployee={handleDeleteEmployeeClick}
          />
        </CardContent>
      </Card>

      <AddEmployeeDialog 
        open={isAddDialogOpen} 
        onOpenChange={handleDialogClose}
        onAddEmployee={handleAddEmployee}
        onUpdateEmployee={handleUpdateEmployee}
        editEmployee={editEmployee}
      />

      <DeleteEmployeeDialog
        employee={employeeToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteEmployee}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default EmployeeDirectory;
