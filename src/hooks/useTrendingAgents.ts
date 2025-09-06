import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TrendingAgent {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  link?: string;
  tags?: string[];
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
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('is_trending', true)
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) {
          setError(error.message);
        } else {
          setAgents(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAgents();
  }, []);

  return { agents, loading, error };
};