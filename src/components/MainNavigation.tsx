
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MainNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const MainNavigation = ({ activeTab, onTabChange, children }: MainNavigationProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[95vw] mx-auto px-6">
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="w-full h-12 bg-transparent p-0 border-0 rounded-none justify-start space-x-0">
              <TabsTrigger 
                value="dashboard" 
                className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 hover:bg-gray-50 transition-all font-medium"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="employee" 
                className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 hover:bg-gray-50 transition-all font-medium"
              >
                Employee
              </TabsTrigger>
              <TabsTrigger 
                value="skill-set" 
                className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 hover:bg-gray-50 transition-all font-medium"
              >
                Skill Set
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 hover:bg-gray-50 transition-all font-medium"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="h-12 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 hover:bg-gray-50 transition-all font-medium"
              >
                Settings
              </TabsTrigger>
            </TabsList>
            {children}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
