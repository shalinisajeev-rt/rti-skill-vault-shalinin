
import { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Employee } from './EmployeeSkillsTable';

interface ExcelImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (employees: Employee[]) => void;
  skills: string[];
}

const ExcelImportDialog = ({ isOpen, onClose, onImport, skills }: ExcelImportDialogProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExcelFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (data.length < 2) {
        throw new Error('Excel file must contain at least a header row and one data row');
      }

      const headers = data[0] as string[];
      const nameColumnIndex = headers.findIndex(h => 
        h && h.toLowerCase().includes('name')
      );

      if (nameColumnIndex === -1) {
        throw new Error('Could not find a name column in the Excel file');
      }

      const employees: Employee[] = [];

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const employeeName = row[nameColumnIndex];
        
        if (!employeeName || typeof employeeName !== 'string') continue;

        const employeeSkills: { [key: string]: 'High' | 'Medium' | 'Low' | '' } = {};

        // Initialize all skills as empty
        skills.forEach(skill => {
          employeeSkills[skill] = '';
        });

        // Map skills from Excel columns
        headers.forEach((header, index) => {
          if (index !== nameColumnIndex && header && skills.includes(header)) {
            const cellValue = row[index];
            if (cellValue) {
              const normalizedValue = cellValue.toString().toLowerCase();
              if (normalizedValue.includes('high') || normalizedValue.includes('h')) {
                employeeSkills[header] = 'High';
              } else if (normalizedValue.includes('medium') || normalizedValue.includes('med') || normalizedValue.includes('m')) {
                employeeSkills[header] = 'Medium';
              } else if (normalizedValue.includes('low') || normalizedValue.includes('l')) {
                employeeSkills[header] = 'Low';
              }
            }
          }
        });

        employees.push({
          id: Date.now().toString() + i,
          name: employeeName.trim(),
          skills: employeeSkills,
        });
      }

      if (employees.length === 0) {
        throw new Error('No valid employee data found in the Excel file');
      }

      onImport(employees);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process Excel file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setError('Please select a valid Excel file (.xlsx or .xls)');
      return;
    }

    processExcelFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Import from Excel
          </DialogTitle>
          <DialogDescription>
            Upload an Excel file to import employee skill matrix data. The file should contain employee names and skill ratings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Drop your Excel file here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supports .xlsx and .xls files
              </p>
            </div>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".xlsx,.xls"
              onChange={(e) => handleFileSelect(e.target.files)}
              disabled={isProcessing}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Expected Format:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• First column should contain employee names</li>
              <li>• Skill columns should match the skill names in the system</li>
              <li>• Use "High", "Medium", or "Low" for skill ratings</li>
              <li>• Empty cells will be treated as "Not Rated"</li>
            </ul>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelImportDialog;
