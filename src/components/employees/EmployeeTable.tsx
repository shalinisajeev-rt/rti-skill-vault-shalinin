
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { ColumnVisibility } from "./CustomizeViewDialog";

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

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  selectedEmployees: string[];
  onEmployeeSelect: (employeeId: string) => void;
  onSelectAll: () => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employee: Employee) => void;
  columnVisibility: ColumnVisibility;
}

export const EmployeeTable = ({ 
  employees, 
  isLoading, 
  selectedEmployees,
  onEmployeeSelect,
  onSelectAll,
  onEditEmployee,
  onDeleteEmployee,
  columnVisibility
}: EmployeeTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading employees...</div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">No employees found.</div>
      </div>
    );
  }

  const isAllSelected = employees.length > 0 && selectedEmployees.length === employees.length;
  const isSomeSelected = selectedEmployees.length > 0 && selectedEmployees.length < employees.length;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                ref={(el) => {
                  if (el) {
                    const input = el.querySelector('input') as HTMLInputElement;
                    if (input) input.indeterminate = isSomeSelected;
                  }
                }}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            {columnVisibility.employeeId && <TableHead>Employee ID</TableHead>}
            {columnVisibility.employeeName && <TableHead>Name</TableHead>}
            {columnVisibility.email && <TableHead>Email</TableHead>}
            {columnVisibility.mobile && <TableHead>Mobile</TableHead>}
            {columnVisibility.role && <TableHead>Role</TableHead>}
            {columnVisibility.dateOfJoining && <TableHead>Date of Joining</TableHead>}
            {columnVisibility.projectLead && <TableHead>Project Lead</TableHead>}
            {columnVisibility.project && <TableHead>Project</TableHead>}
            {columnVisibility.technology && <TableHead>Technology</TableHead>}
            {columnVisibility.skills && <TableHead>Skills</TableHead>}
            {columnVisibility.comments && <TableHead>Comments</TableHead>}
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <Checkbox
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={() => onEmployeeSelect(employee.id)}
                />
              </TableCell>
              {columnVisibility.employeeId && (
                <TableCell className="font-medium">{employee.employee_id}</TableCell>
              )}
              {columnVisibility.employeeName && (
                <TableCell>{employee.employee_name}</TableCell>
              )}
              {columnVisibility.email && (
                <TableCell>{employee.email}</TableCell>
              )}
              {columnVisibility.mobile && (
                <TableCell>{employee.mobile_number}</TableCell>
              )}
              {columnVisibility.role && (
                <TableCell>
                  {employee.role ? (
                    <Badge variant="outline">{employee.role}</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
              )}
              {columnVisibility.dateOfJoining && (
                <TableCell>
                  {format(new Date(employee.date_of_joining), 'MMM dd, yyyy')}
                </TableCell>
              )}
              {columnVisibility.projectLead && (
                <TableCell>{employee.team_project_lead || '-'}</TableCell>
              )}
              {columnVisibility.project && (
                <TableCell>
                  {employee.project ? (
                    <Badge variant="outline">{employee.project}</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
              )}
              {columnVisibility.technology && (
                <TableCell>
                  {employee.technology ? (
                    <Badge variant="secondary">{employee.technology}</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
              )}
              {columnVisibility.skills && (
                <TableCell>
                  {employee.skill ? (
                    <Badge variant="default">{employee.skill}</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
              )}
              {columnVisibility.comments && (
                <TableCell className="max-w-xs truncate">
                  {employee.comments || '-'}
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditEmployee(employee)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteEmployee(employee)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
