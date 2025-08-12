-- Add missing link field to agents table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agents' AND column_name = 'link') THEN
        ALTER TABLE public.agents ADD COLUMN link TEXT;
    END IF;
END $$;

-- Add image_url field if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'agents' AND column_name = 'image_url') THEN
        ALTER TABLE public.agents ADD COLUMN image_url TEXT;
    END IF;
END $$;

-- Enable RLS on agents table
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;