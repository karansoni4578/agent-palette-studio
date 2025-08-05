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
    name: "Runway ML",
    url: "https://runwayml.com",
    description: "AI video editor & effects.",
    tags: ["Editor", "Premium"]
  },
  {
    name: "Pika Labs",
    url: "https://pika.art",
    description: "AI-generated video from text.",
    tags: ["Text-to-Video", "Premium"]
  },
  {
    name: "Synthesia",
    url: "https://synthesia.io",
    description: "AI avatar video presenter.",
    tags: ["Avatar", "Premium"]
  },
  {
    name: "HeyGen",
    url: "https://heygen.com",
    description: "Create business explainers via AI.",
    tags: ["Business", "Premium"]
  },
  {
    name: "Animoto AI",
    url: "https://animoto.com",
    description: "Simple AI slideshow editor.",
    tags: ["Slideshow", "Freemium"]
  },
  {
    name: "Kaiber",
    url: "https://kaiber.ai",
    description: "AI music videos from photos.",
    tags: ["Music Video", "Premium"]
  }
];

const VideoAnimationCategory = () => {
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
            Video & Animation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create and edit videos with AI technology
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

export default VideoAnimationCategory;