
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Employee } from './EmployeeSkillsTable';

interface EmployeeFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'id'>) => void;
  employee?: Employee | null;
  skills: string[];
}

const EmployeeFormDialog = ({
  isOpen,
  onClose,
  onSave,
  employee,
  skills,
}: EmployeeFormDialogProps) => {
  const [name, setName] = useState('');
  const [employeeSkills, setEmployeeSkills] = useState<{ [key: string]: 'High' | 'Medium' | 'Low' | '' }>({});

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmployeeSkills(employee.skills);
    } else {
      setName('');
      const initialSkills: { [key: string]: 'High' | 'Medium' | 'Low' | '' } = {};
      skills.forEach(skill => {
        initialSkills[skill] = '';
      });
      setEmployeeSkills(initialSkills);
    }
  }, [employee, skills, isOpen]);

  const handleSave = () => {
    if (!name.trim()) return;
    
    onSave({
      name: name.trim(),
      skills: employeeSkills,
    });
    
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setEmployeeSkills({});
    onClose();
  };

  const updateSkillRating = (skill: string, rating: 'High' | 'Medium' | 'Low' | '') => {
    setEmployeeSkills(prev => ({
      ...prev,
      [skill]: rating,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </DialogTitle>
          <DialogDescription>
            {employee ? 'Update employee information and skill ratings.' : 'Add a new employee and set their skill ratings.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Employee Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter employee name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-base font-medium">Skill Ratings</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {skills.map((skill) => (
                <div key={skill} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">{skill}</Label>
                  <select
                    value={employeeSkills[skill] || ''}
                    onChange={(e) => updateSkillRating(skill, e.target.value as 'High' | 'Medium' | 'Low' | '')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Not Rated</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {employee ? 'Update Employee' : 'Add Employee'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFormDialog;
