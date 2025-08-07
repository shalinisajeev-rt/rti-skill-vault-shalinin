
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Brain, 
  Settings,
  Building2
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Employee Directory", url: "/employees", icon: Users },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Skill Matrix", url: "/skills", icon: Brain },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-gray-900">RTI</h2>
                <p className="text-xs text-gray-500">Skill Matrix Tracker</p>
              </div>
            )}
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
