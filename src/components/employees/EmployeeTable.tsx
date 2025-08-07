
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, User, Briefcase, Code, Trophy } from "lucide-react";

interface Employee {
  id: string;
  employee_id: string;
  employee_name: string;
  date_of_joining: string;
  email: string;
  mobile_number: string;
  team_project_lead?: string;
  project?: string;
  technology?: string;
  skill?: string;
  comments?: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
}

export function EmployeeTable({ employees, isLoading }: EmployeeTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Employees Found</h3>
          <p className="text-sm text-muted-foreground">
            Get started by adding your first employee.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Employee ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date of Joining</TableHead>
            <TableHead>Project Lead</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Technology</TableHead>
            <TableHead>Skill</TableHead>
            <TableHead className="max-w-[200px]">Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                <Badge variant="outline">{employee.employee_id}</Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{employee.employee_name}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  {employee.email}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  {employee.mobile_number}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {formatDate(employee.date_of_joining)}
                </div>
              </TableCell>
              <TableCell>
                {employee.team_project_lead ? (
                  <div className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    {employee.team_project_lead}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell>
                {employee.project ? (
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    {employee.project}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell>
                {employee.technology ? (
                  <div className="flex items-center">
                    <Code className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {employee.technology}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell>
                {employee.skill ? (
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {employee.skill}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="max-w-[200px]">
                {employee.comments ? (
                  <div className="text-sm text-muted-foreground truncate" title={employee.comments}>
                    {employee.comments}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
