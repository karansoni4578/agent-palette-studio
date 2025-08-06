import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, X, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Tool {
  name: string;
  url: string;
  description: string;
  tags: string[];
  category: string;
  users?: string;
  rating?: number;
}

// Comprehensive database of all AI tools and agents
const allTools: Tool[] = [
  // Chat & Conversation
  { name: "ChatGPT", url: "https://chat.openai.com", description: "The most widely used AI chatbot by OpenAI.", tags: ["GPT-4", "Free", "Popular"], category: "Chat & Conversation", users: "180M+", rating: 4.8 },
  { name: "Claude", url: "https://claude.ai", description: "Friendly AI assistant from Anthropic.", tags: ["Free", "Chatbot"], category: "Chat & Conversation", users: "5M+", rating: 4.7 },
  { name: "Pi", url: "https://pi.ai", description: "Emotionally intelligent personal chatbot.", tags: ["Free", "Personal"], category: "Chat & Conversation", users: "2M+", rating: 4.5 },
  { name: "Character.AI", url: "https://character.ai", description: "Chat with fictional & fan-made characters.", tags: ["Free", "Entertainment"], category: "Chat & Conversation", users: "20M+", rating: 4.6 },
  { name: "Poe", url: "https://poe.com", description: "Multi-model chat (Claude, GPT-4, etc.)", tags: ["Multi-model", "Freemium"], category: "Chat & Conversation", users: "6M+", rating: 4.4 },
  { name: "YouChat", url: "https://you.com/chat", description: "AI chat search assistant from You.com", tags: ["Search", "Free"], category: "Chat & Conversation", users: "500K+", rating: 4.2 },

  // Writing & Content
  { name: "Jasper AI", url: "https://www.jasper.ai", description: "AI copywriter for blogs & ads.", tags: ["Marketing", "Premium"], category: "Writing & Content", users: "1M+", rating: 4.5 },
  { name: "Copy.ai", url: "https://www.copy.ai", description: "Templates + long-form content generator.", tags: ["Templates", "Freemium"], category: "Writing & Content", users: "1M+", rating: 4.3 },
  { name: "Writesonic", url: "https://writesonic.com", description: "Fast writing + ChatSonic included.", tags: ["Fast", "Freemium"], category: "Writing & Content", users: "800K+", rating: 4.4 },
  { name: "Notion AI", url: "https://notion.so/ai", description: "Built-in AI assistant in Notion.", tags: ["Productivity", "Premium"], category: "Writing & Content", users: "10M+", rating: 4.6 },
  { name: "HyperWrite", url: "https://hyperwriteai.com", description: "Personal writing agent.", tags: ["Personal", "Freemium"], category: "Writing & Content", users: "300K+", rating: 4.2 },
  { name: "Rytr", url: "https://rytr.me", description: "Budget-friendly AI writer.", tags: ["Budget", "Freemium"], category: "Writing & Content", users: "500K+", rating: 4.1 },

  // Image & Design
  { name: "Midjourney", url: "https://midjourney.com", description: "Stunning AI art via Discord.", tags: ["Art", "Premium", "Discord"], category: "Image & Design", users: "12M+", rating: 4.8 },
  { name: "Leonardo.ai", url: "https://leonardo.ai", description: "AI image generator with styles.", tags: ["Styles", "Freemium"], category: "Image & Design", users: "3M+", rating: 4.5 },
  { name: "Playground AI", url: "https://playgroundai.com", description: "Free image editor/generator.", tags: ["Free", "Editor"], category: "Image & Design", users: "2M+", rating: 4.3 },
  { name: "Fotor AI", url: "https://fotor.com/features/ai", description: "One-click design generator.", tags: ["Design", "Easy"], category: "Image & Design", users: "1M+", rating: 4.2 },
  { name: "Stockimg AI", url: "https://stockimg.ai", description: "AI-based stock & poster design.", tags: ["Stock", "Posters"], category: "Image & Design", users: "500K+", rating: 4.1 },
  { name: "NightCafe", url: "https://creator.nightcafe.studio", description: "Style transfer + image creation.", tags: ["Style Transfer", "Free"], category: "Image & Design", users: "800K+", rating: 4.0 },

  // Coding & Developer Tools
  { name: "GitHub Copilot", url: "https://github.com/features/copilot", description: "AI pair programmer.", tags: ["GitHub", "Premium", "Popular"], category: "Coding & Developer Tools", users: "2M+", rating: 4.7 },
  { name: "Replit Ghostwriter", url: "https://replit.com/site/ghostwriter", description: "In-editor coding help.", tags: ["IDE", "Premium"], category: "Coding & Developer Tools", users: "3M+", rating: 4.4 },
  { name: "Codeium", url: "https://codeium.com", description: "Free autocomplete for devs.", tags: ["Free", "Autocomplete"], category: "Coding & Developer Tools", users: "500K+", rating: 4.3 },
  { name: "Phind", url: "https://phind.com", description: "AI search engine for developers.", tags: ["Search", "Free"], category: "Coding & Developer Tools", users: "300K+", rating: 4.2 },
  { name: "Tabnine", url: "https://tabnine.com", description: "AI assistant for code suggestions.", tags: ["Suggestions", "Freemium"], category: "Coding & Developer Tools", users: "1M+", rating: 4.1 },
  { name: "AskCodi", url: "https://askcodi.com", description: "Prompt-based code writing.", tags: ["Prompts", "Freemium"], category: "Coding & Developer Tools", users: "200K+", rating: 4.0 },

  // Productivity & Workflow
  { name: "Motion", url: "https://usemotion.com", description: "AI-based calendar + task assistant.", tags: ["Calendar", "Premium"], category: "Productivity & Workflow", users: "100K+", rating: 4.5 },
  { name: "Superhuman AI", url: "https://superhuman.com", description: "Email writing automation.", tags: ["Email", "Premium"], category: "Productivity & Workflow", users: "50K+", rating: 4.6 },
  { name: "Mem AI", url: "https://mem.ai", description: "Smart note-taking with AI memory.", tags: ["Notes", "Premium"], category: "Productivity & Workflow", users: "80K+", rating: 4.3 },
  { name: "Taskade", url: "https://taskade.com", description: "AI-powered productivity workspace.", tags: ["Workspace", "Freemium"], category: "Productivity & Workflow", users: "200K+", rating: 4.2 },
  { name: "ClickUp AI", url: "https://clickup.com/ai", description: "Tasks, summaries, meeting notes.", tags: ["Tasks", "Premium"], category: "Productivity & Workflow", users: "500K+", rating: 4.4 },
  { name: "Magical AI", url: "https://getmagical.com", description: "Auto text expansion with AI.", tags: ["Automation", "Free"], category: "Productivity & Workflow", users: "300K+", rating: 4.1 },

  // Voice & Audio
  { name: "ElevenLabs", url: "https://elevenlabs.io", description: "Realistic voice generation.", tags: ["Voice", "Premium"], category: "Voice & Audio", users: "4M+", rating: 4.7 },
  { name: "Play.ht", url: "https://play.ht", description: "AI voiceovers + TTS.", tags: ["TTS", "Freemium"], category: "Voice & Audio", users: "1M+", rating: 4.3 },
  { name: "Descript", url: "https://descript.com", description: "Edit audio/video like a doc.", tags: ["Editor", "Premium"], category: "Voice & Audio", users: "800K+", rating: 4.5 },
  { name: "Voicemod", url: "https://voicemod.net", description: "Real-time AI voice filters.", tags: ["Filters", "Freemium"], category: "Voice & Audio", users: "2M+", rating: 4.2 },
  { name: "Lovo.ai", url: "https://lovo.ai", description: "Voice generator for creators.", tags: ["Creators", "Premium"], category: "Voice & Audio", users: "500K+", rating: 4.1 },
  { name: "Murf AI", url: "https://murf.ai", description: "Voiceovers for business & education.", tags: ["Business", "Premium"], category: "Voice & Audio", users: "600K+", rating: 4.3 },

  // Video & Animation
  { name: "Runway ML", url: "https://runwayml.com", description: "AI video editor & effects.", tags: ["Editor", "Premium"], category: "Video & Animation", users: "2M+", rating: 4.6 },
  { name: "Pika Labs", url: "https://pika.art", description: "AI-generated video from text.", tags: ["Text-to-Video", "Premium"], category: "Video & Animation", users: "500K+", rating: 4.4 },
  { name: "Synthesia", url: "https://synthesia.io", description: "AI avatar video presenter.", tags: ["Avatar", "Premium"], category: "Video & Animation", users: "3M+", rating: 4.5 },
  { name: "HeyGen", url: "https://heygen.com", description: "Create business explainers via AI.", tags: ["Business", "Premium"], category: "Video & Animation", users: "800K+", rating: 4.3 },
  { name: "Animoto AI", url: "https://animoto.com", description: "Simple AI slideshow editor.", tags: ["Slideshow", "Freemium"], category: "Video & Animation", users: "1M+", rating: 4.1 },
  { name: "Kaiber", url: "https://kaiber.ai", description: "AI music videos from photos.", tags: ["Music Video", "Premium"], category: "Video & Animation", users: "300K+", rating: 4.2 },

  // Additional categories with more tools...
  { name: "AutoGPT", url: "https://github.com/Torantulino/Auto-GPT", description: "Autonomous agents", tags: ["Open Source", "Autonomous"], category: "Experimental & Research", users: "50K+", rating: 4.3 },
  { name: "AgentGPT", url: "https://agentgpt.reworkd.ai", description: "Browser-based agent runner", tags: ["Agents", "Free"], category: "Experimental & Research", users: "100K+", rating: 4.1 },
  { name: "OpenAI API", url: "https://platform.openai.com", description: "GPT-4, Whisper, DALL·E", tags: ["API", "GPT-4", "Premium"], category: "Developer APIs & Models", users: "1M+", rating: 4.8 },
  { name: "Hugging Face", url: "https://huggingface.co", description: "Models, spaces, datasets", tags: ["Open Source", "API", "Free"], category: "Developer APIs & Models", users: "2M+", rating: 4.6 }
];

const categories = [
  "All Categories",
  "Chat & Conversation",
  "Writing & Content", 
  "Image & Design",
  "Coding & Developer Tools",
  "Productivity & Workflow",
  "Voice & Audio",
  "Video & Animation",
  "Data & Analytics",
  "Finance & Crypto",
  "Education & Learning",
  "Marketing & SEO",
  "Healthcare & Wellness",
  "Developer APIs & Models",
  "Security & Legal",
  "Experimental & Research"
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTag, setSelectedTag] = useState("All Tags");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allTools.forEach(tool => tool.tags.forEach(tag => tags.add(tag)));
    return ["All Tags", ...Array.from(tags).sort()];
  }, []);

  // Filter tools based on search query, category, and tags
  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      const matchesSearch = searchQuery === "" || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All Categories" || tool.category === selectedCategory;
      const matchesTag = selectedTag === "All Tags" || tool.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedTag("All Tags");
  };

  // Reset filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedCategory("All Categories");
      setSelectedTag("All Tags");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Search className="w-6 h-6 text-[#F97316]" />
            Search AI Agents & Tools
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-[#F97316] focus:ring-[#F97316] rounded-xl"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 pb-4 border-b">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="focus:border-[#F97316] focus:ring-[#F97316]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="focus:border-[#F97316] focus:ring-[#F97316]">
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={clearFilters}
            variant="outline"
            className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold text-[#F97316]">{filteredTools.length}</span> results
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-[#F97316]/30 cursor-pointer"
                  onClick={() => handleToolClick(tool.url)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#111827] mb-1 hover:text-[#F97316] transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                        {tool.users && (
                          <span>{tool.users} users</span>
                        )}
                        {tool.rating && (
                          <span className="flex items-center gap-1">
                            ⭐ {tool.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-[#F97316] transition-colors flex-shrink-0 ml-4" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.slice(0, 4).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tool.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;