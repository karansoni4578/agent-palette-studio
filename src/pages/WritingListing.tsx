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

// Mock data for writing agents
const writingAgents: Agent[] = [
  {
    id: "1",
    name: "Jasper AI",
    logo: "/placeholder.svg",
    rating: 4.8,
    reviewCount: "1.2M",
    description: "AI writing assistant for marketing copy, blog posts, and creative content. Trained on billions of articles to help you write better content faster.",
    tags: ["Writing", "Marketing", "Blog", "API Available"],
    isFree: false,
    hasAPI: true,
    isOpenSource: false,
    link: "https://jasper.ai"
  },
  {
    id: "2",
    name: "Copy.ai",
    logo: "/placeholder.svg",
    rating: 4.7,
    reviewCount: "890K",
    description: "Generate marketing copy, product descriptions, and creative content with AI. Perfect for businesses and content creators.",
    tags: ["Writing", "Marketing", "Free", "Templates"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://copy.ai"
  },
  {
    id: "3",
    name: "Writesonic",
    logo: "/placeholder.svg",
    rating: 4.6,
    reviewCount: "650K",
    description: "AI writing tool for articles, ads, emails, and website copy. Includes SEO optimization and fact-checking features.",
    tags: ["Writing", "SEO", "Articles", "API Available"],
    isFree: false,
    hasAPI: true,
    isOpenSource: false,
    link: "https://writesonic.com"
  },
  {
    id: "4",
    name: "Grammarly",
    logo: "/placeholder.svg",
    rating: 4.9,
    reviewCount: "2.5M",
    description: "Advanced grammar checker and writing assistant. Helps improve clarity, engagement, and delivery of your writing.",
    tags: ["Writing", "Grammar", "Free", "Browser Extension"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://grammarly.com"
  },
  {
    id: "5",
    name: "Notion AI",
    logo: "/placeholder.svg",
    rating: 4.5,
    reviewCount: "1.8M",
    description: "AI writing assistant built into Notion. Generate content, summarize text, and improve your writing within your workspace.",
    tags: ["Writing", "Productivity", "Workspace", "Integration"],
    isFree: false,
    hasAPI: false,
    isOpenSource: false,
    link: "https://notion.so"
  },
  {
    id: "6",
    name: "QuillBot",
    logo: "/placeholder.svg",
    rating: 4.4,
    reviewCount: "920K",
    description: "AI-powered paraphrasing tool and writing assistant. Rewrite content, check grammar, and improve your writing style.",
    tags: ["Writing", "Paraphrasing", "Free", "Grammar"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://quillbot.com"
  },
  {
    id: "7",
    name: "Rytr",
    logo: "/placeholder.svg",
    rating: 4.3,
    reviewCount: "420K",
    description: "AI writing assistant for creating high-quality content in seconds. Generate blog posts, emails, ads, and more.",
    tags: ["Writing", "Content", "Free", "Templates"],
    isFree: true,
    hasAPI: true,
    isOpenSource: false,
    link: "https://rytr.me"
  },
  {
    id: "8",
    name: "Wordtune",
    logo: "/placeholder.svg",
    rating: 4.2,
    reviewCount: "380K",
    description: "AI writing companion that helps you rewrite and rephrase text to make it more clear, compelling, and authentic.",
    tags: ["Writing", "Rewriting", "Free", "Chrome Extension"],
    isFree: true,
    hasAPI: false,
    isOpenSource: false,
    link: "https://wordtune.com"
  }
];

const WritingListing = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [displayedAgents, setDisplayedAgents] = useState(6);

  const filters = ["All", "Free", "Paid", "API Available", "Open Source"];

  const filteredAgents = writingAgents.filter(agent => {
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
            Top Writing AI Agents
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Browse curated AI writing tools for content creation, copywriting, and grammar assistance.
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

export default WritingListing;