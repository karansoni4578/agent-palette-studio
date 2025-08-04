import { useEffect, useState } from "react";
import AgentCard from "./AgentCard";
import LoadingScreen from "./LoadingScreen";
import { getTrendingAgents, initializeAgentsData, type Agent } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const AgentGrid = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'free' | 'api' | 'trending'>('all');

  useEffect(() => {
    const loadAgents = async () => {
      try {
        // Initialize data if needed
        await initializeAgentsData();
        
        // Get trending agents
        const trendingAgents = await getTrendingAgents(10);
        setAgents(trendingAgents);
      } catch (error) {
        console.error('Error loading agents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  const filteredAgents = agents.filter(agent => {
    switch (filter) {
      case 'free':
        return agent.is_free;
      case 'api':
        return agent.has_api;
      case 'trending':
        return agent.trend_score > 80;
      default:
        return true;
    }
  });

  const formatAgentForCard = (agent: Agent) => ({
    name: agent.name,
    description: agent.description,
    logo: agent.logo,
    tags: agent.tags,
    rating: agent.rating,
    users: agent.users,
    isAgentOfTheDay: agent.trend_score > 90,
    isFree: agent.is_free,
    hasAPI: agent.has_api,
    websiteUrl: agent.website_url
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trending AI Agents
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the top 10 trending AI tools based on current popularity and usage
            </p>
          </div>
          
          {/* Filter Options */}
          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('free')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'free' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Free
            </button>
            <button 
              onClick={() => setFilter('api')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'api' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              API Available
            </button>
            <button 
              onClick={() => setFilter('trending')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'trending' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Hot Trending
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} {...formatAgentForCard(agent)} />
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No agents found matching your filter criteria.</p>
              </div>
            )}

            {/* Refresh Data Button */}
            <div className="text-center mt-12">
              <button 
                onClick={async () => {
                  setLoading(true);
                  const trendingAgents = await getTrendingAgents(10);
                  setAgents(trendingAgents);
                  setLoading(false);
                }}
                className="px-8 py-3 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
              >
                Refresh Trending Data
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AgentGrid;