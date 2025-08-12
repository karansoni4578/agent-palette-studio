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

-- Enable RLS on models_agents table
ALTER TABLE public.models_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view models_agents" 
ON public.models_agents 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert models_agents" 
ON public.models_agents 
FOR INSERT 
WITH CHECK (true);