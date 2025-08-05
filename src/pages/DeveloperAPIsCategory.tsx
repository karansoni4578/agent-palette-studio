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
    name: "OpenAI API",
    url: "https://platform.openai.com",
    description: "GPT-4, Whisper, DALL·E",
    tags: ["API", "GPT-4", "Premium"]
  },
  {
    name: "Hugging Face",
    url: "https://huggingface.co",
    description: "Models, spaces, datasets",
    tags: ["Open Source", "API", "Free"]
  },
  {
    name: "Replicate",
    url: "https://replicate.com",
    description: "Run models via simple APIs",
    tags: ["API", "Premium"]
  },
  {
    name: "Cohere",
    url: "https://cohere.ai",
    description: "Embeddings, command models",
    tags: ["API", "Premium"]
  },
  {
    name: "Groq",
    url: "https://groq.com",
    description: "Fast inference APIs",
    tags: ["API", "Fast"]
  },
  {
    name: "Together.ai",
    url: "https://together.ai",
    description: "Hosted open-source LLMs",
    tags: ["API", "Open Source"]
  }
];

const DeveloperAPIsCategory = () => {
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
            Developer APIs & Models
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            API access to powerful AI models and services
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

export default DeveloperAPIsCategory;