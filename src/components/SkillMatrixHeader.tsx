
import { Users, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SkillMatrixHeaderProps {
  onAddEmployee: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SkillMatrixHeader = ({ onAddEmployee, searchTerm, onSearchChange }: SkillMatrixHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RTI-Skill Matrix Tracker</h1>
              <p className="text-gray-600">Manage and track employee skills efficiently</p>
            </div>
          </div>
          <Button onClick={onAddEmployee} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrixHeader;
