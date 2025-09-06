-- Add is_trending column to agents table
ALTER TABLE public.agents 
ADD COLUMN is_trending boolean NOT NULL DEFAULT false;

-- Create index for better performance on trending queries
CREATE INDEX idx_agents_is_trending ON public.agents(is_trending, created_at DESC);

-- Function to automatically update trending agents based on popularity and recency
CREATE OR REPLACE FUNCTION public.update_trending_agents()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Reset all trending flags
  UPDATE public.agents SET is_trending = false;
  
  -- Mark top 8 most popular agents as trending (based on user count or random if no users data)
  WITH popular_agents AS (
    SELECT id
    FROM public.agents
    WHERE name IS NOT NULL AND description IS NOT NULL
    ORDER BY 
      CASE 
        WHEN tags @> ARRAY['Chatbot'] THEN 3
        WHEN tags @> ARRAY['Image Gen'] THEN 2  
        WHEN tags @> ARRAY['Writing'] THEN 2
        ELSE 1
      END DESC,
      created_at DESC,
      RANDOM()
    LIMIT 8
  )
  UPDATE public.agents 
  SET is_trending = true 
  WHERE id IN (SELECT id FROM popular_agents);
  
  -- Also mark 4 recently added agents (last 2 weeks) as trending
  WITH recent_agents AS (
    SELECT id
    FROM public.agents
    WHERE created_at >= NOW() - INTERVAL '2 weeks'
      AND name IS NOT NULL 
      AND description IS NOT NULL
      AND is_trending = false
    ORDER BY created_at DESC, RANDOM()
    LIMIT 4
  )
  UPDATE public.agents 
  SET is_trending = true 
  WHERE id IN (SELECT id FROM recent_agents);
  
  -- Ensure we have at least 10 trending agents
  WITH ensure_minimum AS (
    SELECT id
    FROM public.agents
    WHERE is_trending = false
      AND name IS NOT NULL 
      AND description IS NOT NULL
    ORDER BY RANDOM()
    LIMIT GREATEST(0, 10 - (SELECT COUNT(*) FROM public.agents WHERE is_trending = true))
  )
  UPDATE public.agents 
  SET is_trending = true 
  WHERE id IN (SELECT id FROM ensure_minimum);
END;
$$;

-- Run the function once to set initial trending agents
SELECT public.update_trending_agents();