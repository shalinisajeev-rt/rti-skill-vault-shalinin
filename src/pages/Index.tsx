
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import MainNavigation from '@/components/MainNavigation';
import Dashboard from '@/components/Dashboard';
import Employee from '@/components/Employee';
import SkillSet from '@/components/SkillSet';
import Projects from '@/components/Projects';
import Settings from '@/components/Settings';
import { Employee as EmployeeType } from '@/components/EmployeeSkillsTable';

const Index = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [activeMainTab, setActiveMainTab] = useState('dashboard');

  return (
    <MainNavigation activeTab={activeMainTab} onTabChange={setActiveMainTab}>
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      
      <TabsContent value="employee">
        <Employee />
      </TabsContent>
      
      <TabsContent value="skill-set">
        <SkillSet employees={employees} setEmployees={setEmployees} />
      </TabsContent>
      
      <TabsContent value="projects">
        <Projects />
      </TabsContent>
      
      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </MainNavigation>
  );
};

export default Index;
