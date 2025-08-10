import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Search } from "lucide-react";
import SearchModal from "./SearchModal";

interface Agent {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
  users: string;
}

const allAgents: Agent[] = [
  {
    id: 1,
    name: "ChatGPT",
    description: "The most widely used AI chatbot powered by OpenAI.",
    link: "https://chat.openai.com",
    tags: ["Free", "GPT-4", "Chatbot"],
    users: "180M+"
  },
  {
    id: 2,
    name: "Claude",
    description: "High-context, safer AI assistant by Anthropic.",
    link: "https://claude.ai",
    tags: ["Free", "API", "Chatbot"],
    users: "5M+"
  },
  {
    id: 3,
    name: "Midjourney",
    description: "Stunning AI image generator via Discord prompts.",
    link: "https://midjourney.com",
    tags: ["Paid", "Image Gen"],
    users: "12M+"
  },
  {
    id: 4,
    name: "Poe",
    description: "One place to chat with GPT-4, Claude, Gemini, etc.",
    link: "https://poe.com",
    tags: ["Multi-model", "Free+", "API"],
    users: "6M+"
  },
  {
    id: 5,
    name: "Replit Ghostwriter",
    description: "AI code assistant built into Replit IDE.",
    link: "https://replit.com/site/ghostwriter",
    tags: ["Dev Tool", "Paid", "API"],
    users: "3M+"
  },
  {
    id: 6,
    name: "Jasper",
    description: "AI-powered long-form and marketing content writer.",
    link: "https://jasper.ai",
    tags: ["Paid", "API", "Writing"],
    users: "1M+"
  },
  {
    id: 7,
    name: "ElevenLabs",
    description: "The most realistic AI voice generation platform.",
    link: "https://elevenlabs.io",
    tags: ["Free+", "Voice", "API"],
    users: "4M+"
  },
  {
    id: 8,
    name: "Synthesia",
    description: "Create AI avatar videos from just text.",
    link: "https://synthesia.io",
    tags: ["Paid", "API"],
    users: "3M+"
  },
  {
    id: 9,
    name: "HuggingChat",
    description: "Open-source chatbot by Hugging Face.",
    link: "https://huggingface.co/chat",
    tags: ["Free", "Open Source"],
    users: "500K+"
  },
  {
    id: 10,
    name: "Character.AI",
    description: "Chat with fictional characters and roleplay bots.",
    link: "https://character.ai",
    tags: ["Free", "Chatbot"],
    users: "20M+"
  },
  {
    id: 11,
    name: "Playground AI",
    description: "Free image generation tool with creative editing.",
    link: "https://playgroundai.com",
    tags: ["Free", "Image"],
    users: "2M+"
  },
  {
    id: 12,
    name: "AutoGPT",
    description: "Autonomous AI agent framework.",
    link: "https://github.com/Torantulino/Auto-GPT",
    tags: ["Open Source", "Dev Tool"],
    users: "50K+"
  },
  {
    id: 13,
    name: "ChatSonic",
    description: "GPT-powered chatbot with web search integration.",
    link: "https://writesonic.com/chat",
    tags: ["Free+", "GPT-4", "Chatbot"],
    users: "1M+"
  },
  {
    id: 14,
    name: "Copy.ai",
    description: "Marketing copy and social posts in seconds.",
    link: "https://copy.ai",
    tags: ["Free", "API", "Content"],
    users: "1M+"
  },
  {
    id: 15,
    name: "Notion AI",
    description: "Built-in AI inside Notion for writing, summarizing, etc.",
    link: "https://notion.so/ai",
    tags: ["Free+", "Productivity"],
    users: "10M+"
  },
  {
    id: 16,
    name: "Runway ML",
    description: "Video editor with AI magic tools like green screen.",
    link: "https://runwayml.com",
    tags: ["Free+", "Video"],
    users: "2M+"
  },
  {
    id: 17,
    name: "YouChat",
    description: "Search + Chatbot assistant powered by AI.",
    link: "https://you.com/chat",
    tags: ["Free", "GPT-4"],
    users: "500K+"
  },
  {
    id: 18,
    name: "GitHub Copilot",
    description: "AI pair programmer that completes your code.",
    link: "https://github.com/features/copilot",
    tags: ["GPT-4", "Dev Tool"],
    users: "2M+"
  },
  {
    id: 19,
    name: "HyperWrite",
    description: "AI that writes and even acts on web for you.",
    link: "https://hyperwriteai.com",
    tags: ["Free", "Agent", "Browser Extension"],
    users: "300K+"
  },
  {
    id: 20,
    name: "Elicit",
    description: "Research paper summarization and Q&A assistant.",
    link: "https://elicit.org",
    tags: ["Free", "Research"],
    users: "200K+"
  }
];

const TrendingAgents = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showMore, setShowMore] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const filters = ["All", "Free", "API Available", "Chatbots", "Dev Tools", "Open Source"];

  const filterAgents = (agents: Agent[]) => {
    switch (activeFilter) {
      case "Free":
        return agents.filter(agent => 
          agent.tags.some(tag => tag.toLowerCase().includes("free"))
        );
      case "API Available":
        return agents.filter(agent => 
          agent.tags.some(tag => tag.toLowerCase().includes("api"))
        );
      case "Chatbots":
        return agents.filter(agent => 
          agent.tags.some(tag => tag.toLowerCase().includes("chatbot"))
        );
      case "Dev Tools":
        return agents.filter(agent => 
          agent.tags.some(tag => tag.toLowerCase().includes("dev tool"))
        );
      case "Open Source":
        return agents.filter(agent => 
          agent.tags.some(tag => tag.toLowerCase().includes("open source"))
        );
      default:
        return agents;
    }
  };

  const filteredAgents = filterAgents(allAgents);
  const visibleAgents = showMore ? filteredAgents : filteredAgents.slice(0, 10);

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-[#FFF7ED]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              🔥 Trending AI Agents & Models
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Most used, most loved — explore what's trending this week
            </p>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#F97316] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleAgents.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white rounded-2xl p-6 border border-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleToolClick(agent.link)}
            >
              {/* Agent Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-[#F97316] transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {agent.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {agent.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="text-[#F97316] mr-1">🔹</span>
                  <span className="font-medium">{agent.users} users</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {agent.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs px-2 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Visit Button */}
              <Button
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Visit Tool
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!showMore && filteredAgents.length > 10 && (
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowMore(true)}
              className="bg-white border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Load More ({filteredAgents.length - 10} more)
            </Button>
          </div>
        )}

      </div>
      
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </section>
  );
};

export default TrendingAgents;