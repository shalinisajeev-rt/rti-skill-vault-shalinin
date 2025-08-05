
import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, User, Badge, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  careerStartDate: string;
  totalExperience: string;
}

const Employee = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'John Doe',
      careerStartDate: '2020-01-15',
      totalExperience: '4.9 years'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Jane Smith',
      careerStartDate: '2019-03-20',
      totalExperience: '5.7 years'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Mike Johnson',
      careerStartDate: '2021-07-10',
      totalExperience: '3.3 years'
    }
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  const [universalSearch, setUniversalSearch] = useState('');
  const [filters, setFilters] = useState({
    employeeId: '',
    name: '',
    careerStartDate: '',
    totalExperience: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    careerStartDate: ''
  });

  const calculateExperience = (startDate: string): string => {
    const start = new Date(startDate);
    const now = new Date();
    const diffInMs = now.getTime() - start.getTime();
    const years = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return `${years.toFixed(1)} years`;
  };

  useEffect(() => {
    let filtered = [...employees];

    // Apply universal search first
    if (universalSearch.trim() !== '') {
      filtered = filtered.filter(employee =>
        Object.values(employee).some(value =>
          value.toLowerCase().includes(universalSearch.toLowerCase())
        )
      );
    }

    // Apply individual filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value.trim() !== '') {
        filtered = filtered.filter(employee => {
          const employeeValue = employee[key as keyof Employee];
          return employeeValue.toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    setFilteredEmployees(filtered);
  }, [filters, employees, universalSearch]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleUniversalSearchChange = (value: string) => {
    setUniversalSearch(value);
  };

  const handleAddEmployee = () => {
    if (!formData.employeeId || !formData.name || !formData.careerStartDate) return;

    const newEmployee: Employee = {
      id: Date.now().toString(),
      employeeId: formData.employeeId,
      name: formData.name,
      careerStartDate: formData.careerStartDate,
      totalExperience: calculateExperience(formData.careerStartDate)
    };

    setEmployees(prev => [...prev, newEmployee]);
    setFormData({ employeeId: '', name: '', careerStartDate: '' });
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({ employeeId: '', name: '', careerStartDate: '' });
  };

  const resetFilters = () => {
    setFilters({
      employeeId: '',
      name: '',
      careerStartDate: '',
      totalExperience: ''
    });
    setUniversalSearch('');
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Management</h1>
              <p className="text-gray-600">Manage your team members and their information</p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96 p-4">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="space-y-4">
                    {/* Universal Search Bar */}
                    <div>
                      <Label htmlFor="universal-search">Universal Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="universal-search"
                          value={universalSearch}
                          onChange={(e) => handleUniversalSearchChange(e.target.value)}
                          placeholder="Search across all criteria..."
                          className="pl-10 mt-1"
                        />
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Individual Filter Fields */}
                    <div>
                      <Label htmlFor="employee-id-filter">Employee ID</Label>
                      <Input
                        id="employee-id-filter"
                        value={filters.employeeId}
                        onChange={(e) => handleFilterChange('employeeId', e.target.value)}
                        placeholder="Enter Employee ID..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="name-filter">Employee Name</Label>
                      <Input
                        id="name-filter"
                        value={filters.name}
                        onChange={(e) => handleFilterChange('name', e.target.value)}
                        placeholder="Enter Employee Name..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="career-start-filter">Career Start Date</Label>
                      <Input
                        id="career-start-filter"
                        value={filters.careerStartDate}
                        onChange={(e) => handleFilterChange('careerStartDate', e.target.value)}
                        placeholder="Enter Start Date (e.g., 2020-01-15)..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience-filter">Total Experience</Label>
                      <Input
                        id="experience-filter"
                        value={filters.totalExperience}
                        onChange={(e) => handleFilterChange('totalExperience', e.target.value)}
                        placeholder="Enter Experience (e.g., 4.9 years)..."
                        className="mt-1"
                      />
                    </div>

                    <Button onClick={resetFilters} variant="outline" className="w-full mt-4">
                      Reset All Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Employee
              </Button>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Employee Name</TableHead>
                  <TableHead className="font-semibold text-gray-900">Employee Id</TableHead>
                  <TableHead className="font-semibold text-gray-900">Career Start Date</TableHead>
                  <TableHead className="font-semibold text-gray-900">Total Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{employee.name}</TableCell>
                    <TableCell className="text-gray-600">{employee.employeeId}</TableCell>
                    <TableCell className="text-gray-600">{new Date(employee.careerStartDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-gray-600">{employee.totalExperience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No employees found</div>
                <div className="text-gray-400 text-sm">Try adjusting your search or filters</div>
              </div>
            )}
          </div>
        </div>

        {/* Add Employee Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter the employee details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                  placeholder="Enter Employee ID"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name">Employee Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter Employee Name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="careerStartDate">Career Start Date</Label>
                <Input
                  id="careerStartDate"
                  type="date"
                  value={formData.careerStartDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, careerStartDate: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddEmployee}
                disabled={!formData.employeeId || !formData.name || !formData.careerStartDate}
              >
                Add Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Employee;
