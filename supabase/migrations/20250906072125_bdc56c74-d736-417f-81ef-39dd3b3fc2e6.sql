-- Set up cron job to automatically update trending agents daily
SELECT cron.schedule(
  'update-trending-agents-daily',
  '0 2 * * *', -- Run at 2 AM daily
  $$
  SELECT net.http_post(
    url := 'https://casroknzdishifjrwkit.supabase.co/functions/v1/update-trending',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhc3Jva256ZGlzaGlmanJ3a2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODc0NzUsImV4cCI6MjA2OTk2MzQ3NX0.JUcrit1iBoD6FkPRz6Ua1BctZPul8QefG3-fONKO_K0"}'::jsonb,
    body := '{"trigger": "cron"}'::jsonb
  );
  $$
);