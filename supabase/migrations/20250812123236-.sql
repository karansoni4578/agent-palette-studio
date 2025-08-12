-- Create RLS policies for agents table
CREATE POLICY "Anyone can view agents" 
ON public.agents 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert agents" 
ON public.agents 
FOR INSERT 
WITH CHECK (true);

-- Enable RLS on categories table 
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" 
ON public.categories 
FOR SELECT 
USING (true);