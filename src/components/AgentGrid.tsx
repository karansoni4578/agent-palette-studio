import AgentCard from "./AgentCard";

// Mock data for demonstration
const agents = [
  {
    name: "ChatGPT Assistant",
    description: "Advanced conversational AI that can help with writing, analysis, coding, and creative tasks. Perfect for daily productivity.",
    logo: "/placeholder.svg",
    tags: ["Chat", "Writing", "Coding"],
    rating: 4.9,
    users: "2M+",
    isAgentOfTheDay: true,
    isFree: false,
    hasAPI: true
  },
  {
    name: "Code Copilot",
    description: "AI-powered coding assistant that helps write, debug, and optimize code across multiple programming languages.",
    logo: "/placeholder.svg",
    tags: ["Coding", "Development", "Debug"],
    rating: 4.8,
    users: "500K+",
    isFree: false,
    hasAPI: true
  },
  {
    name: "Write Assistant",
    description: "Professional writing tool for creating blogs, articles, and marketing copy with perfect grammar and style.",
    logo: "/placeholder.svg",
    tags: ["Writing", "Content", "Marketing"],
    rating: 4.7,
    users: "300K+",
    isFree: true,
    hasAPI: false
  },
  {
    name: "AutoFlow Pro",
    description: "Workflow automation platform that connects your favorite apps and services to save time on repetitive tasks.",
    logo: "/placeholder.svg",
    tags: ["Automation", "Workflow", "Integration"],
    rating: 4.6,
    users: "150K+",
    isFree: false,
    hasAPI: true
  },
  {
    name: "Data Analyzer",
    description: "Transform raw data into actionable insights with natural language queries and automated visualizations.",
    logo: "/placeholder.svg",
    tags: ["Analytics", "Data", "Visualization"],
    rating: 4.8,
    users: "80K+",
    isFree: true,
    hasAPI: true
  },
  {
    name: "Voice Assistant",
    description: "Natural speech processing AI that can transcribe, translate, and generate human-like voice responses.",
    logo: "/placeholder.svg",
    tags: ["Voice", "Speech", "Translation"],
    rating: 4.5,
    users: "200K+",
    isFree: false,
    hasAPI: true
  }
];

const AgentGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured AI Agents
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the most popular and highly-rated AI tools in our collection
            </p>
          </div>
          
          {/* Filter Options */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
              All
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              Free
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              API Available
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              Trending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors">
            Load More Agents
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgentGrid;