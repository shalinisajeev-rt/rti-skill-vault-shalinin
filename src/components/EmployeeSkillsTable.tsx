
import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SkillRatingBadge from './SkillRatingBadge';

export interface Employee {
  id: string;
  name: string;
  skills: {
    [key: string]: 'High' | 'Medium' | 'Low' | '';
  };
}

interface EmployeeSkillsTableProps {
  employees: Employee[];
  skills: string[];
  onUpdateSkill: (employeeId: string, skill: string, rating: 'High' | 'Medium' | 'Low' | '') => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
}

const EmployeeSkillsTable = ({
  employees,
  skills,
  onUpdateSkill,
  onEditEmployee,
  onDeleteEmployee,
}: EmployeeSkillsTableProps) => {
  const [editingCell, setEditingCell] = useState<{ employeeId: string; skill: string } | null>(null);

  const handleSkillUpdate = (employeeId: string, skill: string, rating: 'High' | 'Medium' | 'Low' | '') => {
    onUpdateSkill(employeeId, skill, rating);
    setEditingCell(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900 min-w-[200px] sticky left-0 bg-gray-50 z-10">
                Employee Name
              </TableHead>
              {skills.map((skill) => (
                <TableHead key={skill} className="font-semibold text-gray-900 min-w-[120px] text-center">
                  {skill}
                </TableHead>
              ))}
              <TableHead className="font-semibold text-gray-900 min-w-[100px] text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                  {employee.name}
                </TableCell>
                {skills.map((skill) => (
                  <TableCell key={`${employee.id}-${skill}`} className="text-center">
                    {editingCell?.employeeId === employee.id && editingCell?.skill === skill ? (
                      <Select
                        value={employee.skills[skill] || ''}
                        onValueChange={(value) => handleSkillUpdate(employee.id, skill, value as 'High' | 'Medium' | 'Low' | '')}
                        onOpenChange={(open) => !open && setEditingCell(null)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Not Rated</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <SkillRatingBadge
                        rating={employee.skills[skill] || ''}
                        onClick={() => setEditingCell({ employeeId: employee.id, skill })}
                      />
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditEmployee(employee)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteEmployee(employee.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {employees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No employees found</div>
          <div className="text-gray-400 text-sm">Add your first employee to get started</div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSkillsTable;
