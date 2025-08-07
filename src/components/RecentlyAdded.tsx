import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Agent {
  name: string;
  description: string;
  image: string;
  category?: string;
}

const recentAgents: Agent[] = [
  { name: "GPT-4 Turbo", description: "Advanced conversational AI with enhanced reasoning capabilities", image: "/placeholder.svg", category: "Chat" },
  { name: "Claude 3 Opus", description: "Anthropic's most capable AI assistant for complex tasks", image: "/placeholder.svg", category: "Writing" },
  { name: "DALL-E 3", description: "OpenAI's latest image generation model with improved quality", image: "/placeholder.svg", category: "Image" },
  { name: "Midjourney V6", description: "Professional-grade AI art generator with photorealistic outputs", image: "/placeholder.svg", category: "Design" },
  { name: "GitHub Copilot X", description: "AI-powered code completion and programming assistant", image: "/placeholder.svg", category: "Coding" },
  { name: "Notion AI", description: "Intelligent writing and productivity assistant for workspaces", image: "/placeholder.svg", category: "Productivity" },
  { name: "Jasper AI", description: "Enterprise marketing copywriting and content creation tool", image: "/placeholder.svg", category: "Marketing" },
  { name: "Synthesia", description: "AI video generation platform with realistic avatars", image: "/placeholder.svg", category: "Video" },
  { name: "ElevenLabs", description: "High-quality AI voice synthesis and cloning technology", image: "/placeholder.svg", category: "Voice" },
  { name: "Perplexity AI", description: "Research-focused search engine with AI-powered answers", image: "/placeholder.svg", category: "Research" },
  { name: "Runway ML", description: "Creative AI tools for video editing and generation", image: "/placeholder.svg", category: "Video" },
  { name: "Stable Diffusion XL", description: "Open-source image generation with enhanced detail control", image: "/placeholder.svg", category: "Image" },
  { name: "Character.AI", description: "Interactive AI characters for entertainment and roleplay", image: "/placeholder.svg", category: "Chat" },
  { name: "Grammarly AI", description: "Advanced writing assistant with tone and clarity suggestions", image: "/placeholder.svg", category: "Writing" },
  { name: "Zapier AI", description: "Intelligent automation platform for workflow optimization", image: "/placeholder.svg", category: "Productivity" },
  { name: "DataRobot", description: "Enterprise AI platform for predictive analytics", image: "/placeholder.svg", category: "Analytics" },
  { name: "Copy.ai", description: "AI-powered copywriting tool for marketing content", image: "/placeholder.svg", category: "Marketing" },
  { name: "Murf AI", description: "Professional AI voiceover generator with multiple languages", image: "/placeholder.svg", category: "Voice" },
  { name: "Tableau AI", description: "Smart data visualization with natural language queries", image: "/placeholder.svg", category: "Analytics" },
  { name: "Loom AI", description: "Automatic video transcription and summary generation", image: "/placeholder.svg", category: "Video" }
];

const AgentCard = ({ agent, index }: { agent: Agent; index: number }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex-shrink-0 w-[280px] bg-card rounded-2xl shadow-lg border border-border/50 p-6 ml-6 first:ml-6 last:mr-6 transition-transform duration-200 cursor-pointer hover:shadow-xl"
      style={{ scrollSnapAlign: 'start' }}
      onClick={() => window.open('#', '_blank')}
    >
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-full h-full" />
          )}
          <img
            src={agent.image}
            alt={agent.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
          {imageError && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg font-bold">
                {agent.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-foreground text-sm leading-tight truncate">
              {agent.name}
            </h3>
            {agent.category && (
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                {agent.category}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed overflow-hidden" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const
          }}>
            {agent.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const RecentlyAdded = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recently Added
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the latest AI agents and models that have joined our curated collection
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-6 sm:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            <div className="flex w-max pb-4 gap-0">
              {recentAgents.map((agent, index) => (
                <AgentCard key={agent.name} agent={agent} index={index} />
              ))}
            </div>
          </motion.div>
          
          {/* Desktop Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-6 hidden sm:block md:hidden"
          >
            <p className="text-muted-foreground text-sm">
              Scroll horizontally to explore more →
            </p>
          </motion.div>
          
          {/* Fade Gradients */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Mobile Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-6 md:hidden"
        >
          <p className="text-muted-foreground text-sm">
            Swipe left to explore more →
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default RecentlyAdded;