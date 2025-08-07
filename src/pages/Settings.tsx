
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Palette
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your application preferences and configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <CardTitle>Organization Settings</CardTitle>
            </div>
            <CardDescription>
              Configure your organization's basic information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="RTI Technologies" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Organization Email</Label>
                <Input id="org-email" type="email" defaultValue="admin@rti.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-description">Description</Label>
              <Input id="org-description" defaultValue="Leading technology solutions provider" />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>
              Manage user roles and permissions across the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">User Registration</p>
                  <p className="text-sm text-muted-foreground">Allow new users to register</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Enable 2FA for enhanced security</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>
              Configure how and when you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Project Updates</p>
                  <p className="text-sm text-muted-foreground">Notifications for project changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Skill Matrix Changes</p>
                  <p className="text-sm text-muted-foreground">Notifications for skill updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security & Privacy</CardTitle>
            </div>
            <CardDescription>
              Manage security settings and data privacy options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Data Encryption</p>
                  <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Enabled
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Audit Logging</p>
                  <p className="text-sm text-muted-foreground">Log all system activities</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Enabled
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Automatic logout after inactivity</p>
                </div>
                <Badge variant="outline">
                  30 minutes
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <CardTitle>Database & Storage</CardTitle>
            </div>
            <CardDescription>
              Monitor database usage and configure storage settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">124</p>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">87</p>
                  <p className="text-sm text-muted-foreground">Skills Tracked</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Database className="mr-2 h-4 w-4" />
                Export Database Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-muted-foreground">Use compact layouts to show more content</p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Sidebar Auto-collapse</p>
                  <p className="text-sm text-muted-foreground">Automatically collapse sidebar on small screens</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
