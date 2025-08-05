import { useEffect, useState } from "react";
import AgentCard from "./AgentCard";
import LoadingScreen from "./LoadingScreen";
import { getTrendingAgents, initializeAgentsData, type Agent } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MessageCircle, 
  PenTool, 
  Code, 
  Palette, 
  Video, 
  Mic, 
  Settings, 
  Megaphone, 
  Zap, 
  DollarSign, 
  GraduationCap, 
  Scale, 
  Heart, 
  Beaker, 
  Users 
} from "lucide-react";

// Category mapping with icons
const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'chat': MessageCircle,
  'writing': PenTool,
  'coding': Code,
  'design': Palette,
  'video': Video,
  'voice': Mic,
  'apis': Settings,
  'marketing': Megaphone,
  'automation': Zap,
  'finance': DollarSign,
  'education': GraduationCap,
  'legal': Scale,
  'healthcare': Heart,
  'research': Beaker,
  'opensource': Users
};

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

  // Group agents by category
  const agentsByCategory = filteredAgents.reduce((acc, agent) => {
    const category = agent.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(agent);
    return acc;
  }, {} as { [key: string]: Agent[] });

  // Sort categories by number of agents (descending)
  const sortedCategories = Object.entries(agentsByCategory)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 6); // Show top 6 categories with most agents

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
              AI Agents by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover trending AI tools organized by their use cases and categories
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
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, agentIndex) => (
                    <div key={agentIndex} className="bg-card rounded-xl p-6 space-y-4">
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
              </div>
            ))}
          </div>
        ) : (
          <>
            {sortedCategories.length > 0 ? (
              <div className="space-y-12">
                {sortedCategories.map(([category, categoryAgents]) => {
                  const IconComponent = categoryIcons[category] || Settings;
                  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                  
                  return (
                    <div key={category} className="space-y-6">
                      {/* Category Header */}
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {categoryName}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          ({categoryAgents.length} agents)
                        </span>
                      </div>
                      
                      {/* Category Agents Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryAgents.slice(0, 3).map((agent) => (
                          <AgentCard key={agent.id} {...formatAgentForCard(agent)} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No agents found matching your filter criteria.</p>
              </div>
            )}

            {/* Refresh Data Button */}
            <div className="text-center mt-12">
              <button 
                onClick={async () => {
                  setLoading(true);
                  const trendingAgents = await getTrendingAgents(20);
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