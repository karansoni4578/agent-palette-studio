-- Create the agents table
CREATE TABLE IF NOT EXISTS agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo TEXT NOT NULL,
  website_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 4.0,
  users TEXT DEFAULT '0',
  is_free BOOLEAN DEFAULT false,
  has_api BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  trend_score INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on trend_score for faster sorting
CREATE INDEX IF NOT EXISTS idx_agents_trend_score ON agents(trend_score DESC);

-- Create an index on category for filtering
CREATE INDEX IF NOT EXISTS idx_agents_category ON agents(category);

-- Create an index on created_at for date-based queries
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read agents
CREATE POLICY "Anyone can view agents" ON agents FOR SELECT USING (true);

-- Create a policy that allows authenticated users to insert agents
CREATE POLICY "Authenticated users can insert agents" ON agents FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update agents
CREATE POLICY "Authenticated users can update agents" ON agents FOR UPDATE 
USING (auth.role() = 'authenticated');