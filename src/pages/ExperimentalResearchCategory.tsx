import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Tool {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

const tools: Tool[] = [
  {
    name: "AutoGPT",
    url: "https://github.com/Torantulino/Auto-GPT",
    description: "Autonomous agents",
    tags: ["Open Source", "Autonomous"]
  },
  {
    name: "AgentGPT",
    url: "https://agentgpt.reworkd.ai",
    description: "Browser-based agent runner",
    tags: ["Agents", "Free"]
  },
  {
    name: "BabyAGI",
    url: "https://github.com/yoheinakajima/babyagi",
    description: "Task-based agents",
    tags: ["Open Source", "Tasks"]
  },
  {
    name: "ChatDev",
    url: "https://github.com/openbmb/ChatDev",
    description: "Multi-role AI dev workflow",
    tags: ["Open Source", "Development"]
  },
  {
    name: "LangChain Hub",
    url: "https://hub.langchain.com",
    description: "Prompt + agent workflows",
    tags: ["Workflows", "Free"]
  },
  {
    name: "SMOL AI",
    url: "https://github.com/smol-ai/developer",
    description: "AI that builds apps",
    tags: ["Open Source", "Builder"]
  }
];

const ExperimentalResearchCategory = () => {
  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experimental & Research Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge AI research and experimental tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Tool Header */}
              <div className="mb-3">
                <h4 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Visit Button */}
              <Button
                onClick={() => handleToolClick(tool.url)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                Visit Tool
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExperimentalResearchCategory;