import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import SkillMatrixHeader from '@/components/SkillMatrixHeader';
import EmployeeSkillsTable, { Employee } from '@/components/EmployeeSkillsTable';
import EmployeeFormDialog from '@/components/EmployeeFormDialog';

// Skills based on the provided requirements
const DEFAULT_SKILLS = [
  // CAN / FD
  'CanIF', 'CanNm', 'CanSm', 'CanTp', 'CanTsync', 'CanXCP', 'J1939Nm', 'J1939Rm', 'J1939Tp',
  
  // LIN
  'LinIf', 'LinNm', 'LinSm', 'LinTp', 'LinXCP',
  
  // ETH
  'DNS', 'DoIP', 'EthIf', 'EthSm', 'EthTsync', 'EthXCP', 'Sd', 'SoAD', 'Tcp/IP', 'UdpNm',
  
  // Fr
  'FrArTp', 'FrIf', 'FrNm', 'FrSm', 'FrTp', 'FrTsync', 'FrXcp',
  
  // COM
  'Com', 'E2EXf', 'LdCom', 'SecOC', 'SomeIPXf', 'ComXf', 'IPDUM', 'PDUR', 'SomeIpTp',
  
  // Diag
  'UDS', 'KWP', 'DCM', 'DEM', 'FiM', 'DLT', 'DET', 'J1939DCM',
  
  // NVM/Mem
  'Fls', 'EA', 'NvM',
  
  // CDD
  'Std CDD', 'Custom Cdd', 'FEE', 'EEP', 'FlsTst', 'RamTst',
  
  // RTE
  'RTE',
  
  // MCAL
  'MCU', 'WDG', 'Gpt', 'ADC', 'CAN', 'Fr', 'LIN', 'Eth', 'SPI', 'DIO', 'ICU', 'Port', 'PWM', 'Crpto (HW)',
  
  // ASW
  'ASW',
  
  // Crypto
  'KeyM', 'Csm', 'CryIF', 'Crytpo', 'IdsM',
  
  // OS (OSEK)
  'Single Core', 'Multi Core',
  
  // RTM
  'RTM',
  
  // IoHwAb
  'IoHwAb',
  
  // HSM
  'HSM',
  
  // SHE
  'SHE',
  
  // Crypto Lib
  'Crypto Lib',
  
  // Bootloader
  'FBL', 'BM', 'FBL Updater', 'Memory Partitioning', 'Secure Boot',
  
  // Stack Vendor
  'Hexview', 'vFlash', 'Vector', 'Electrobit', 'KSAR', 'ETAS'
];

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleSaveEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(prev => 
        prev.map(emp => 
          emp.id === editingEmployee.id 
            ? { ...employeeData, id: editingEmployee.id }
            : emp
        )
      );
      toast({
        title: "Employee Updated",
        description: `${employeeData.name} has been successfully updated.`,
      });
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...employeeData,
        id: Date.now().toString(),
      };
      setEmployees(prev => [...prev, newEmployee]);
      toast({
        title: "Employee Added",
        description: `${employeeData.name} has been successfully added to the skill matrix.`,
      });
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    toast({
      title: "Employee Deleted",
      description: `${employee?.name} has been removed from the skill matrix.`,
      variant: "destructive",
    });
  };

  const handleUpdateSkill = (employeeId: string, skill: string, rating: 'High' | 'Medium' | 'Low' | '') => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? {
              ...emp,
              skills: {
                ...emp.skills,
                [skill]: rating,
              },
            }
          : emp
      )
    );
    
    const employee = employees.find(emp => emp.id === employeeId);
    toast({
      title: "Skill Updated",
      description: `${employee?.name}'s ${skill} rating has been updated to ${rating || 'Not Rated'}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SkillMatrixHeader
        onAddEmployee={handleAddEmployee}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Employee Skills Overview
                </h2>
                <p className="text-sm text-gray-600">
                  {employees.length} {employees.length === 1 ? 'employee' : 'employees'} • {DEFAULT_SKILLS.length} skills tracked
                </p>
              </div>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-full"></div>
                  <span className="text-gray-600">High</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded-full"></div>
                  <span className="text-gray-600">Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-full"></div>
                  <span className="text-gray-600">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EmployeeSkillsTable
          employees={filteredEmployees}
          skills={DEFAULT_SKILLS}
          onUpdateSkill={handleUpdateSkill}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteEmployee}
        />
      </div>

      <EmployeeFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
        skills={DEFAULT_SKILLS}
      />
    </div>
  );
};

export default Index;
