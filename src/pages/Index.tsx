import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillMatrixHeader from '@/components/SkillMatrixHeader';
import EmployeeSkillsTable, { Employee } from '@/components/EmployeeSkillsTable';
import EmployeeFormDialog from '@/components/EmployeeFormDialog';
import ExcelImportDialog from '@/components/ExcelImportDialog';

// Skills based on the provided requirements for Autosar Classic
const AUTOSAR_CLASSIC_SKILLS = [
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

// Placeholder skills for other tabs (to be defined later)
const CICD_SKILLS = [
  'Jenkins', 'GitLab CI/CD', 'Azure DevOps', 'Docker', 'Kubernetes', 'Ansible', 'Terraform'
];

const PROGRAMMING_LANGUAGE_SKILLS = [
  'C', 'C++', 'Python', 'Java', 'JavaScript', 'Rust', 'Go', 'MATLAB/Simulink'
];

const AUTOSAR_ADAPTIVE_SKILLS = [
  'Adaptive Platform', 'Service-Oriented Architecture', 'REST API', 'DDS', 'Binding', 'Execution Management'
];

const REQUIREMENT_ENGINEERING_SKILLS = [
  'DOORS', 'Polarion', 'Jama', 'Requirements Analysis', 'Traceability', 'Use Case Modeling'
];

const FUNCTIONAL_SAFETY_SKILLS = [
  'ISO 26262', 'ASIL', 'FMEA', 'FTA', 'Safety Case', 'Hazard Analysis', 'Safety Requirements'
];

const PROCESS_SKILLS = [
  'ASPICE', 'Agile', 'Scrum', 'V-Model', 'DevOps', 'Lean', 'Six Sigma'
];

const SOFTWARE_ARCHITECTURE_SKILLS = [
  'UML', 'SysML', 'Design Patterns', 'Component Architecture', 'Interface Design', 'SOLID Principles'
];

const TESTING_SKILLS = [
  'Unit Testing', 'Integration Testing', 'System Testing', 'HIL Testing', 'SIL Testing', 'Automated Testing'
];

const SKILL_CATEGORIES = {
  'autosar-classic': AUTOSAR_CLASSIC_SKILLS,
  'cicd': CICD_SKILLS,
  'programming-language': PROGRAMMING_LANGUAGE_SKILLS,
  'autosar-adaptive': AUTOSAR_ADAPTIVE_SKILLS,
  'requirement-engineering': REQUIREMENT_ENGINEERING_SKILLS,
  'functional-safety': FUNCTIONAL_SAFETY_SKILLS,
  'process': PROCESS_SKILLS,
  'software-architecture': SOFTWARE_ARCHITECTURE_SKILLS,
  'testing': TESTING_SKILLS,
};

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExcelImportOpen, setIsExcelImportOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState('autosar-classic');
  const { toast } = useToast();

  const currentSkills = SKILL_CATEGORIES[activeTab as keyof typeof SKILL_CATEGORIES] || AUTOSAR_CLASSIC_SKILLS;

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsDialogOpen(true);
  };

  const handleImportExcel = () => {
    setIsExcelImportOpen(true);
  };

  const handleExcelImport = (importedEmployees: Employee[]) => {
    setEmployees(prev => [...prev, ...importedEmployees]);
    toast({
      title: "Excel Import Successful",
      description: `Successfully imported ${importedEmployees.length} employee(s) from Excel file.`,
    });
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
        onImportExcel={handleImportExcel}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-9 mb-6">
            <TabsTrigger value="autosar-classic" className="text-sm">Autosar Classic</TabsTrigger>
            <TabsTrigger value="cicd" className="text-sm">CICD</TabsTrigger>
            <TabsTrigger value="programming-language" className="text-sm">Programming Language</TabsTrigger>
            <TabsTrigger value="autosar-adaptive" className="text-sm">Autosar Adaptive</TabsTrigger>
            <TabsTrigger value="requirement-engineering" className="text-sm">Requirement Engineering</TabsTrigger>
            <TabsTrigger value="functional-safety" className="text-sm">Functional Safety</TabsTrigger>
            <TabsTrigger value="process" className="text-sm">Process</TabsTrigger>
            <TabsTrigger value="software-architecture" className="text-sm">Software Architecture</TabsTrigger>
            <TabsTrigger value="testing" className="text-sm">Testing</TabsTrigger>
          </TabsList>

          {Object.keys(SKILL_CATEGORIES).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey} className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 capitalize">
                      {tabKey.replace('-', ' ')} Skills Overview
                    </h2>
                    <p className="text-sm text-gray-600">
                      {employees.length} {employees.length === 1 ? 'employee' : 'employees'} • {currentSkills.length} skills tracked
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

              <EmployeeSkillsTable
                employees={filteredEmployees}
                skills={SKILL_CATEGORIES[tabKey as keyof typeof SKILL_CATEGORIES]}
                onUpdateSkill={handleUpdateSkill}
                onEditEmployee={handleEditEmployee}
                onDeleteEmployee={handleDeleteEmployee}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <EmployeeFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
        skills={currentSkills}
      />

      <ExcelImportDialog
        isOpen={isExcelImportOpen}
        onClose={() => setIsExcelImportOpen(false)}
        onImport={handleExcelImport}
        skills={currentSkills}
      />
    </div>
  );
};

export default Index;
