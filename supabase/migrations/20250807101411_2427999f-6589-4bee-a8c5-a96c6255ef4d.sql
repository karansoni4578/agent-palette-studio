-- Add slug column to blog_posts table for SEO-friendly URLs
ALTER TABLE "blog posts" ADD COLUMN slug text;

-- Create an index on slug for better performance
CREATE INDEX idx_blog_posts_slug ON "blog posts"(slug);

-- Add a unique constraint on slug to prevent duplicates
ALTER TABLE "blog posts" ADD CONSTRAINT unique_blog_slug UNIQUE(slug);

-- Enable RLS on blog_posts table
ALTER TABLE "blog posts" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read published blog posts
CREATE POLICY "Anyone can read blog posts" 
ON "blog posts" 
FOR SELECT 
USING (true);