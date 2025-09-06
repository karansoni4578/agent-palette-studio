import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SearchModal from "./SearchModal";
import { useTrendingAgents } from "@/hooks/useTrendingAgents";
import { ExternalLink } from "lucide-react";

const TrendingAgents = () => {
  const { agents, loading, error } = useTrendingAgents();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleToolClick = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🔥 Trending AI Agents & Models
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the most popular AI tools that everyone's talking about right now
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-full">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🔥 Trending AI Agents & Models
            </h2>
            <p className="text-lg text-destructive">
              Failed to load trending agents. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (agents.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-full">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🔥 Trending AI Agents & Models
            </h2>
            <p className="text-lg text-muted-foreground">
              No trending agents this week. Check back later!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🔥 Trending AI Agents & Models
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the most popular AI tools that everyone's talking about right now
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card hover:bg-accent/5 border border-border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
              onClick={() => agent.link && handleToolClick(agent.link)}
            >
              <div className="flex items-center gap-3 mb-4">
                {agent.logo_url ? (
                  <img
                    src={agent.logo_url}
                    alt={`${agent.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {agent.name?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
                    {agent.name}
                  </h3>
                  {agent.is_free && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Free
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {agent.description}
              </p>
              
              {agent.tags && agent.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {agent.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {agent.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              
              <Button
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  if (agent.link) handleToolClick(agent.link);
                }}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit Tool
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={() => setSearchModalOpen(true)}
            variant="outline"
            size="lg"
          >
            🔍 Explore More AI Tools
          </Button>
        </div>
      </div>
      
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </section>
  );
};

export default TrendingAgents;