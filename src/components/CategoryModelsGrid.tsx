import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import ModelAgentCard from '@/components/ModelAgentCard';
import { useModelsAgents } from '@/hooks/useModelsAgents';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryModelsGridProps {
  category: string;
  title: string;
  description?: string;
}

const CategoryModelsGrid: React.FC<CategoryModelsGridProps> = ({ 
  category, 
  title, 
  description 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pricingFilter, setPricingFilter] = useState<'Free' | 'Paid' | 'Freemium' | 'all'>('all');
  
  const { models, loading, error, searchModels } = useModelsAgents(category);

  // Filter models based on search and pricing
  const filteredModels = searchModels(
    searchTerm, 
    pricingFilter === 'all' ? undefined : pricingFilter
  );

  const LoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-16 w-16 rounded-lg mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-3" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {title}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {description}
            </p>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search models and agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            {/* Pricing Filter */}
            <div className="flex justify-center">
              <Select value={pricingFilter} onValueChange={(value: 'Free' | 'Paid' | 'Freemium' | 'all') => setPricingFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by pricing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pricing</SelectItem>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Freemium">Freemium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-muted-foreground text-center">
              {filteredModels.length} {filteredModels.length === 1 ? 'result' : 'results'} found
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Unable to load models at the moment. Please try again later.</p>
          </div>
        )}

        {/* Models Grid */}
        {!loading && !error && filteredModels.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 6) }}
              >
                <ModelAgentCard model={model} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && filteredModels.length === 0 && models.length > 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No models match your search criteria.</p>
          </div>
        )}

        {/* No Models in Category */}
        {!loading && !error && models.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No models available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryModelsGrid;