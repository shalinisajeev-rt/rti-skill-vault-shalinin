
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectLead {
  id: string;
  name: string;
  email: string;
  department: string;
}

const Settings = () => {
  const [projectLeads, setProjectLeads] = useState<ProjectLead[]>([]);
  const [newLead, setNewLead] = useState({ name: '', email: '', department: '' });

  const handleAddProjectLead = () => {
    if (newLead.name && newLead.email && newLead.department) {
      const lead: ProjectLead = {
        id: Date.now().toString(),
        ...newLead
      };
      setProjectLeads([...projectLeads, lead]);
      setNewLead({ name: '', email: '', department: '' });
    }
  };

  const handleDeleteProjectLead = (id: string) => {
    setProjectLeads(projectLeads.filter(lead => lead.id !== id));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your application settings and preferences</p>
        </div>
        
        <Tabs defaultValue="project-leads" className="w-full">
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <TabsList className="w-full h-auto bg-transparent p-0 flex gap-1">
              <TabsTrigger 
                value="project-leads" 
                className="flex-1 text-sm font-medium px-4 py-2 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:shadow-sm hover:bg-gray-50 transition-all"
              >
                Project Leads
              </TabsTrigger>
              <TabsTrigger 
                value="general" 
                className="flex-1 text-sm font-medium px-4 py-2 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:shadow-sm hover:bg-gray-50 transition-all"
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex-1 text-sm font-medium px-4 py-2 rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:shadow-sm hover:bg-gray-50 transition-all"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="project-leads" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Project Lead</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={newLead.department}
                    onChange={(e) => setNewLead({ ...newLead, department: e.target.value })}
                    placeholder="Enter department"
                  />
                </div>
              </div>
              <Button onClick={handleAddProjectLead} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Project Lead
              </Button>
            </div>

            {projectLeads.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Project Leads</h2>
                <div className="space-y-3">
                  {projectLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{lead.name}</h3>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-500">{lead.department}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProjectLead(lead.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
              <p className="text-gray-500">General configuration options will be implemented here</p>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
              <p className="text-gray-500">Notification preferences will be implemented here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
