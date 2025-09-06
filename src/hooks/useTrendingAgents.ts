import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TrendingAgent {
  id: string;
  name: string;
  description: string;
  link: string;
  logo_url: string;
  tags: string[];
  is_free: boolean;
  created_at: string;
}

export const useTrendingAgents = () => {
  const [agents, setAgents] = useState<TrendingAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingAgents = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('is_trending', true)
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) {
          console.error('Error fetching trending agents:', error);
          setError('Failed to load trending agents');
          return;
        }

        setAgents(data || []);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load trending agents');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAgents();
  }, []);

  return { agents, loading, error };
};