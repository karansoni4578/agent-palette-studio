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

-- Ensure foreign key constraint exists
ALTER TABLE public.agents 
ADD CONSTRAINT IF NOT EXISTS agents_category_id_fkey 
FOREIGN KEY (category_id) REFERENCES public.categories(id);