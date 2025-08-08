
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface ColumnVisibility {
  employeeId: boolean;
  employeeName: boolean;
  email: boolean;
  mobile: boolean;
  role: boolean;
  dateOfJoining: boolean;
  projectLead: boolean;
  project: boolean;
  technology: boolean;
  skills: boolean;
  comments: boolean;
}

interface CustomizeViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnVisibility: ColumnVisibility;
  onColumnVisibilityChange: (visibility: ColumnVisibility) => void;
}

const columnLabels: Record<keyof ColumnVisibility, string> = {
  employeeId: "Employee ID",
  employeeName: "Employee Name", 
  email: "Email Address",
  mobile: "Mobile Number",
  role: "Role",
  dateOfJoining: "Date of Joining",
  projectLead: "Project Lead",
  project: "Project",
  technology: "Technology",
  skills: "Skills",
  comments: "Comments",
};

export const CustomizeViewDialog = ({
  open,
  onOpenChange,
  columnVisibility,
  onColumnVisibilityChange,
}: CustomizeViewDialogProps) => {
  const handleColumnToggle = (column: keyof ColumnVisibility, checked: boolean) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [column]: checked,
    });
  };

  const handleSelectAll = () => {
    const newVisibility = Object.keys(columnLabels).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = true;
      return acc;
    }, {} as ColumnVisibility);
    onColumnVisibilityChange(newVisibility);
  };

  const handleDeselectAll = () => {
    const newVisibility = Object.keys(columnLabels).reduce((acc, key) => {
      acc[key as keyof ColumnVisibility] = false;
      return acc;
    }, {} as ColumnVisibility);
    onColumnVisibilityChange(newVisibility);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize View</DialogTitle>
          <DialogDescription>
            Select which columns you want to display in the employee table.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeselectAll}>
              Deselect All
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
            {Object.entries(columnLabels).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={columnVisibility[key as keyof ColumnVisibility]}
                  onCheckedChange={(checked) =>
                    handleColumnToggle(key as keyof ColumnVisibility, checked as boolean)
                  }
                />
                <Label
                  htmlFor={key}
                  className="text-sm font-normal cursor-pointer"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
