
import { Search, Plus, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SkillMatrixHeaderProps {
  onAddEmployee: () => void;
  onImportExcel: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SkillMatrixHeader = ({
  onAddEmployee,
  onImportExcel,
  searchTerm,
  onSearchChange,
}: SkillMatrixHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              RTI-Skill Matrix Tracker
            </h1>
            <p className="text-sm text-gray-600">
              Manage and track employee skills across automotive software domains
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Button
              onClick={onImportExcel}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Import Excel</span>
            </Button>
            
            <Button onClick={onAddEmployee} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrixHeader;
