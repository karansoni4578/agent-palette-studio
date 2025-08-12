-- Create storage policies for agent-logos bucket
CREATE POLICY "Anyone can upload to agent-logos bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'agent-logos');

CREATE POLICY "Anyone can view agent-logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'agent-logos');

CREATE POLICY "Anyone can update agent-logos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'agent-logos');