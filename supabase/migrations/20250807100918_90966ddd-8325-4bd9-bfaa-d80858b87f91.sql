
-- Create employees table to store employee data
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL UNIQUE,
  employee_name TEXT NOT NULL,
  date_of_joining DATE NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  team_project_lead TEXT,
  project TEXT,
  technology TEXT,
  skill TEXT,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to view employees
CREATE POLICY "Anyone can view employees" 
  ON public.employees 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create policy to allow all authenticated users to insert employees
CREATE POLICY "Anyone can create employees" 
  ON public.employees 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow all authenticated users to update employees
CREATE POLICY "Anyone can update employees" 
  ON public.employees 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy to allow all authenticated users to delete employees
CREATE POLICY "Anyone can delete employees" 
  ON public.employees 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create trigger to update the updated_at column
CREATE TRIGGER handle_updated_at_employees 
  BEFORE UPDATE ON public.employees 
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
