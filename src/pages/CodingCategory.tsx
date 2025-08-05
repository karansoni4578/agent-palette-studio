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
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    description: "AI pair programmer.",
    tags: ["GitHub", "Premium", "Popular"]
  },
  {
    name: "Replit Ghostwriter",
    url: "https://replit.com/site/ghostwriter",
    description: "In-editor coding help.",
    tags: ["IDE", "Premium"]
  },
  {
    name: "Codeium",
    url: "https://codeium.com",
    description: "Free autocomplete for devs.",
    tags: ["Free", "Autocomplete"]
  },
  {
    name: "Phind",
    url: "https://phind.com",
    description: "AI search engine for developers.",
    tags: ["Search", "Free"]
  },
  {
    name: "Tabnine",
    url: "https://tabnine.com",
    description: "AI assistant for code suggestions.",
    tags: ["Suggestions", "Freemium"]
  },
  {
    name: "AskCodi",
    url: "https://askcodi.com",
    description: "Prompt-based code writing.",
    tags: ["Prompts", "Freemium"]
  }
];

const CodingCategory = () => {
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
            Coding & Developer Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI assistants for developers and programmers
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

export default CodingCategory;