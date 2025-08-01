import React, { useState, useMemo } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data - in a real app, this would come from your data store/API
const mockEmployees = [
  { id: '1', name: 'John Doe', projects: ['Project A', 'Project B'], skills: ['CanIF', 'CanNm', 'React'], utilization: 100 },
  { id: '2', name: 'Jane Smith', projects: ['Project B', 'Project C'], skills: ['LinIf', 'Python', 'Docker'], utilization: 80 },
  { id: '3', name: 'Mike Johnson', projects: ['Project A'], skills: ['CanIF', 'Java', 'Jenkins'], utilization: 60 },
  { id: '4', name: 'Sarah Wilson', projects: ['Project C', 'Project D'], skills: ['EthIf', 'JavaScript', 'Kubernetes'], utilization: 100 },
  { id: '5', name: 'David Brown', projects: ['Project A', 'Project D'], skills: ['CanIF', 'React', 'Docker'], utilization: 40 },
  { id: '6', name: 'Lisa Garcia', projects: ['Project B'], skills: ['LinIf', 'Python', 'Jenkins'], utilization: 80 },
];

const mockProjects = [
  { id: 'proj1', name: 'Project A', employees: ['John Doe', 'Mike Johnson', 'David Brown'], skills: ['CanIF', 'CanNm', 'React', 'Java', 'Docker'] },
  { id: 'proj2', name: 'Project B', employees: ['John Doe', 'Jane Smith', 'Lisa Garcia'], skills: ['CanIF', 'LinIf', 'React', 'Python', 'Docker', 'Jenkins'] },
  { id: 'proj3', name: 'Project C', employees: ['Jane Smith', 'Sarah Wilson'], skills: ['LinIf', 'EthIf', 'Python', 'JavaScript'] },
  { id: 'proj4', name: 'Project D', employees: ['Sarah Wilson', 'David Brown'], skills: ['EthIf', 'JavaScript', 'Kubernetes', 'CanIF', 'React', 'Docker'] },
];

const allSkills = ['CanIF', 'CanNm', 'LinIf', 'EthIf', 'React', 'Python', 'Java', 'JavaScript', 'Docker', 'Jenkins', 'Kubernetes'];
const utilizationOptions = [20, 40, 60, 80, 100];

const Dashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedUtilization, setSelectedUtilization] = useState('all');

  // Dynamic filtering logic
  const filteredData = useMemo(() => {
    let employees = [...mockEmployees];
    let projects = [...mockProjects];
    let skills = [...allSkills];
    let utilizations = [...utilizationOptions];

    // Filter based on selected employee
    if (selectedEmployee !== 'all') {
      const employee = employees.find(emp => emp.id === selectedEmployee);
      if (employee) {
        projects = projects.filter(proj => employee.projects.includes(proj.name));
        skills = employee.skills;
        utilizations = [employee.utilization];
      }
    }

    // Filter based on selected project
    if (selectedProject !== 'all') {
      const project = projects.find(proj => proj.id === selectedProject);
      if (project) {
        employees = employees.filter(emp => project.employees.includes(emp.name));
        skills = project.skills;
        utilizations = [...new Set(employees.map(emp => emp.utilization))].sort((a, b) => a - b);
      }
    }

    // Filter based on selected skill
    if (selectedSkill !== 'all') {
      employees = employees.filter(emp => emp.skills.includes(selectedSkill));
      projects = projects.filter(proj => proj.skills.includes(selectedSkill));
      utilizations = [...new Set(employees.map(emp => emp.utilization))].sort((a, b) => a - b);
    }

    // Filter based on selected utilization
    if (selectedUtilization !== 'all') {
      const utilizationValue = parseInt(selectedUtilization);
      employees = employees.filter(emp => emp.utilization === utilizationValue);
      projects = projects.filter(proj => 
        proj.employees.some(empName => 
          employees.find(emp => emp.name === empName && emp.utilization === utilizationValue)
        )
      );
      const filteredEmployeeSkills = employees.flatMap(emp => emp.skills);
      skills = skills.filter(skill => filteredEmployeeSkills.includes(skill));
    }

    return { employees, projects, skills, utilizations };
  }, [selectedEmployee, selectedProject, selectedSkill, selectedUtilization]);

  // Get table data based on current filters
  const tableData = useMemo(() => {
    const data = [];
    const { employees, projects } = filteredData;

    employees.forEach(employee => {
      const employeeProjects = projects.filter(proj => 
        employee.projects.includes(proj.name) && 
        (selectedProject === 'all' || proj.id === selectedProject)
      );
      
      if (employeeProjects.length === 0) {
        data.push({
          employee: employee.name,
          project: 'No matching projects',
          skills: employee.skills.filter(skill => 
            selectedSkill === 'all' || skill === selectedSkill
          ).join(', ') || 'No matching skills',
          utilization: `${employee.utilization}%`
        });
      } else {
        employeeProjects.forEach(project => {
          data.push({
            employee: employee.name,
            project: project.name,
            skills: employee.skills.filter(skill => 
              project.skills.includes(skill) && 
              (selectedSkill === 'all' || skill === selectedSkill)
            ).join(', ') || 'No matching skills',
            utilization: `${employee.utilization}%`
          });
        });
      }
    });

    return data;
  }, [filteredData, selectedProject, selectedSkill]);

  const handleEmployeeChange = (value: string) => {
    setSelectedEmployee(value);
    if (value !== 'all') {
      setSelectedProject('all');
      setSelectedSkill('all');
      setSelectedUtilization('all');
    }
  };

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    if (value !== 'all') {
      setSelectedEmployee('all');
      setSelectedSkill('all');
      setSelectedUtilization('all');
    }
  };

  const handleSkillChange = (value: string) => {
    setSelectedSkill(value);
    if (value !== 'all') {
      setSelectedEmployee('all');
      setSelectedProject('all');
      setSelectedUtilization('all');
    }
  };

  const handleUtilizationChange = (value: string) => {
    setSelectedUtilization(value);
    if (value !== 'all') {
      setSelectedEmployee('all');
      setSelectedProject('all');
      setSelectedSkill('all');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Overview of your skill matrix and team performance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{mockEmployees.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Skill Categories</p>
                <p className="text-2xl font-bold text-gray-900">9</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Employee Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
              <Select value={selectedEmployee} onValueChange={handleEmployeeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {filteredData.employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
              <Select value={selectedProject} onValueChange={handleProjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {filteredData.projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Skill Set Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Set</label>
              <Select value={selectedSkill} onValueChange={handleSkillChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {filteredData.skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Utilization Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Utilization</label>
              <Select value={selectedUtilization} onValueChange={handleUtilizationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Utilization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Utilizations</SelectItem>
                  {filteredData.utilizations.map((utilization) => (
                    <SelectItem key={utilization} value={utilization.toString()}>
                      {utilization}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Employee</TableHead>
                  <TableHead className="font-semibold text-gray-900">Project</TableHead>
                  <TableHead className="font-semibold text-gray-900">Skills</TableHead>
                  <TableHead className="font-semibold text-gray-900">Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{row.employee}</TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell className="max-w-xs truncate" title={row.skills}>
                        {row.skills}
                      </TableCell>
                      <TableCell>{row.utilization}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No matching records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
