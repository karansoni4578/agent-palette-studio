import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ModelAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  tags: string[];
  is_free: boolean;
  official_url: string;
  date_added: string;
}

export const useModelsAgents = (category?: string, limit?: number) => {
  const [models, setModels] = useState<ModelAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('models_agents')
          .select('*')
          .order('date_added', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setModels(data || []);
      } catch (err) {
        console.error('Error fetching models/agents:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch models/agents');
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [category, limit]);

  const searchModels = (searchTerm: string, filterFree?: boolean) => {
    return models.filter(model => {
      const matchesSearch = searchTerm === '' || 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = filterFree === undefined || model.is_free === filterFree;

      return matchesSearch && matchesFilter;
    });
  };

  return {
    models,
    loading,
    error,
    searchModels
  };
};

export const useRecentModelsAgents = (limit: number = 8) => {
  return useModelsAgents(undefined, limit);
};