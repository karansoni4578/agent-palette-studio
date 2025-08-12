-- Add missing link field to agents table and ensure image_url field exists
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS link TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update logo_url to image_url if logo_url exists and image_url doesn't
UPDATE public.agents 
SET image_url = logo_url 
WHERE logo_url IS NOT NULL AND image_url IS NULL;

-- Drop logo_url column if it exists (since we want image_url)
ALTER TABLE public.agents 
DROP COLUMN IF EXISTS logo_url;

-- Enable RLS on agents table
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read agents
CREATE POLICY IF NOT EXISTS "Anyone can view agents" 
ON public.agents 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert agents
CREATE POLICY IF NOT EXISTS "Anyone can insert agents" 
ON public.agents 
FOR INSERT 
WITH CHECK (true);

-- Ensure foreign key constraint exists
ALTER TABLE public.agents 
ADD CONSTRAINT IF NOT EXISTS agents_category_id_fkey 
FOREIGN KEY (category_id) REFERENCES public.categories(id);

-- Create storage bucket if it doesn't exist (using agent-logos as per your config)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('agent-logos', 'agent-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for agent-logos bucket
CREATE POLICY IF NOT EXISTS "Anyone can view agent logos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'agent-logos');

CREATE POLICY IF NOT EXISTS "Anyone can upload agent logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'agent-logos');

CREATE POLICY IF NOT EXISTS "Anyone can update agent logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'agent-logos');