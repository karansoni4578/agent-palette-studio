import { useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Agent {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: string;
  description: string;
  tags: string[];
  isFree: boolean;
  hasAPI: boolean;
  isOpenSource: boolean;
  link: string;
}

// Mock data for coding agents
const codingAgents: Agent[] = [
  {
    id: "1",
    name: "GitHub Copilot",
    logo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: "2.8M",
    description: "AI pair programmer that helps you write code faster. Suggests whole lines or entire functions right inside your editor.",
    tags: ["Coding", "AI Assistant", "IDE Integration", "API Available"],
    isFree: false,
    hasAPI: true,
    isOpenSource: false,
    link: "https://github.com/features/copilot"
  },
  {
    id: "2",
    name: "Tabnine",
    logo: "/placeholder.svg",
    rating: 4.7,
    reviewCount: "1.5M",
    description: "AI code completion tool that predicts and suggests your next lines of code based on context and syntax.",
    tags: ["Coding", "Code Completion", "Free", "Multi-Language"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://tabnine.com"
  },
  {
    id: "3",
    name: "Replit Ghostwriter",
    logo: "/placeholder.svg",
    rating: 4.6,
    reviewCount: "890K",
    description: "AI-powered coding assistant built into Replit. Generate, complete, transform, and explain code in real-time.",
    tags: ["Coding", "Online IDE", "Code Generation", "Explanation"],
    isFree: false,
    hasAPI: false,
    isOpenSource: false,
    link: "https://replit.com/site/ghostwriter"
  },
  {
    id: "4",
    name: "CodeT5",
    logo: "/placeholder.svg",
    rating: 4.5,
    reviewCount: "320K",
    description: "Open-source AI model for code understanding and generation. Supports multiple programming languages and tasks.",
    tags: ["Coding", "Open Source", "Free", "Multi-Language"],
    isFree: true,
    hasAPI: true,
    isOpenSource: true,
    link: "https://github.com/salesforce/CodeT5"
  },
  {
    id: "5",
    name: "Amazon CodeWhisperer",
    logo: "/placeholder.svg",
    rating: 4.4,
    reviewCount: "650K",
    description: "AI coding companion that generates code suggestions in real-time. Trained on billions of lines of code.",
    tags: ["Coding", "AWS", "Free", "Security Scanning"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://aws.amazon.com/codewhisperer"
  },
  {
    id: "6",
    name: "Cursor",
    logo: "/placeholder.svg",
    rating: 4.3,
    reviewCount: "280K",
    description: "AI-first code editor built for pair-programming with AI. Edit code with natural language instructions.",
    tags: ["Coding", "Code Editor", "Natural Language", "AI Pair Programming"],
    isFree: false,
    hasAPI: false,
    isOpenSource: false,
    link: "https://cursor.sh"
  },
  {
    id: "7",
    name: "Codeium",
    logo: "/placeholder.svg",
    rating: 4.2,
    reviewCount: "420K",
    description: "Free AI-powered toolkit for developers. Code autocomplete, search, and chat in 70+ programming languages.",
    tags: ["Coding", "Free", "Autocomplete", "Multi-Language"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://codeium.com"
  },
  {
    id: "8",
    name: "Sourcegraph Cody",
    logo: "/placeholder.svg",
    rating: 4.1,
    reviewCount: "180K",
    description: "AI coding assistant that knows your entire codebase. Answer questions, write code, and fix bugs faster.",
    tags: ["Coding", "Codebase Search", "Free", "Enterprise"],
    isFree: true,
    hasAPI: true,
    isOpenSource: true,
    link: "https://sourcegraph.com/cody"
  }
];

const CodingListing = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [displayedAgents, setDisplayedAgents] = useState(6);

  const filters = ["All", "Free", "Paid", "API Available", "Open Source"];

  const filteredAgents = codingAgents.filter(agent => {
    switch (activeFilter) {
      case "Free":
        return agent.isFree;
      case "Paid":
        return !agent.isFree;
      case "API Available":
        return agent.hasAPI;
      case "Open Source":
        return agent.isOpenSource;
      default:
        return true;
    }
  });

  const visibleAgents = filteredAgents.slice(0, displayedAgents);

  const loadMore = () => {
    setDisplayedAgents(prev => Math.min(prev + 6, filteredAgents.length));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "text-primary fill-current" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Top Coding AI Agents
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Browse curated AI coding assistants and development tools for faster, smarter programming.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setDisplayedAgents(6);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing {visibleAgents.length} of {filteredAgents.length} agents
          </p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleAgents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-card rounded-2xl p-6 border border-border hover-lift cursor-pointer card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              {/* Agent Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <img src={agent.logo} alt={agent.name} className="w-12 h-12 rounded-lg" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-foreground truncate group-hover:text-primary transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {agent.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center">
                      {renderStars(agent.rating)}
                      <span className="text-sm text-foreground ml-2 font-medium">{agent.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{agent.reviewCount} users</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                {agent.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors duration-200"
                onClick={() => window.open(agent.link, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Get Details
              </Button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedAgents < filteredAgents.length && (
          <div className="text-center mb-16">
            <Button
              onClick={loadMore}
              variant="outline"
              className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              Load More Agents
            </Button>
          </div>
        )}

        {/* How We Curate Section */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            → How We Curate Agents
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">
                All agents are hand-picked from trusted directories like Futurepedia, There's an AI for That, Toolify, and other reputable sources in the AI community.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">
                Data includes official links, verified features, accurate pricing information, and real user ratings to help you make informed decisions.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-muted-foreground">
                Affiliate links may be used in some cases, but only after manual testing and verification to ensure we recommend quality tools that provide real value.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CodingListing;