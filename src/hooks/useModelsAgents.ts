import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ModelAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  logo_url?: string;
  tags: string[];
  pricing_type: 'Free' | 'Paid' | 'Freemium';
  website_url: string;
  created_at: string;
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
          .from('agents')
          .select(`
            *,
            categories!inner(name)
          `)
          .order('created_at', { ascending: false });

        if (category) {
          query = query.eq('categories.name', category);
        }

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        // Transform agents data to match ModelAgent interface
        const transformedData: ModelAgent[] = (data || []).map((agent: any) => ({
          id: agent.id,
          name: agent.name,
          description: agent.description || '',
          category: agent.categories?.name || '',
          logo_url: agent.logo_url || agent.image_url,
          tags: agent.tags || [],
          pricing_type: (agent.is_free ? 'Free' : 'Freemium') as 'Free' | 'Paid' | 'Freemium',
          website_url: agent.link || '',
          created_at: agent.created_at
        }));
        
        setModels(transformedData);
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

  const searchModels = (searchTerm: string, pricingFilter?: 'Free' | 'Paid' | 'Freemium') => {
    return models.filter(model => {
      const matchesSearch = searchTerm === '' || 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = pricingFilter === undefined || model.pricing_type === pricingFilter;

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

export const useRecentModelsAgents = (limit: number = 10) => {
  return useModelsAgents(undefined, limit);
};