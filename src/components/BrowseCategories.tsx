import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  PenTool, 
  Code, 
  Palette, 
  Video, 
  Mic, 
  Settings, 
  Megaphone, 
  Zap, 
  DollarSign, 
  GraduationCap, 
  Scale, 
  Heart, 
  Beaker, 
  Users,
  BarChart3,
  Shield
} from "lucide-react";

interface Category {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const allCategories: Category[] = [
  {
    name: "Chat & Conversation",
    description: "Smart AI chatbots for messaging & support",
    icon: MessageCircle,
    route: "/category/chat"
  },
  {
    name: "Writing & Content",
    description: "AI tools for copywriting and content creation",
    icon: PenTool,
    route: "/category/writing"
  },
  {
    name: "Image & Design",
    description: "AI-powered image generation and design tools",
    icon: Palette,
    route: "/category/image-design"
  },
  {
    name: "Coding & Developer Tools",
    description: "AI assistants for programming and debugging",
    icon: Code,
    route: "/category/coding"
  },
  {
    name: "Productivity & Workflow",
    description: "Automation tools to streamline tasks and boost efficiency",
    icon: Zap,
    route: "/category/productivity"
  },
  {
    name: "Voice & Audio",
    description: "Speech synthesis and audio processing tools",
    icon: Mic,
    route: "/category/voice-audio"
  },
  {
    name: "Video & Animation",
    description: "AI video creation and animation platforms",
    icon: Video,
    route: "/category/video-animation"
  },
  {
    name: "Data & Analytics",
    description: "AI-driven insights and data visualization",
    icon: BarChart3,
    route: "/category/data-analytics"
  },
  {
    name: "Finance & Crypto",
    description: "Trading bots and financial analysis tools",
    icon: DollarSign,
    route: "/category/finance-crypto"
  },
  {
    name: "Education & Learning",
    description: "AI tutors and personalized learning platforms",
    icon: GraduationCap,
    route: "/category/education-learning"
  },
  {
    name: "Marketing & SEO",
    description: "AI tools for digital marketing and growth",
    icon: Megaphone,
    route: "/category/marketing-seo"
  },
  {
    name: "Healthcare & Wellness",
    description: "Medical AI and wellness optimization tools",
    icon: Heart,
    route: "/category/healthcare-wellness"
  },
  {
    name: "Developer APIs & Models",
    description: "Machine learning models and development APIs",
    icon: Settings,
    route: "/category/developer-apis"
  },
  {
    name: "Security & Legal",
    description: "AI for cybersecurity and legal document analysis",
    icon: Shield,
    route: "/category/security-legal"
  },
  {
    name: "Experimental & Research Projects",
    description: "Cutting-edge AI research and experimental tools",
    icon: Beaker,
    route: "/category/experimental-research"
  }
];

const BrowseCategories = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  
  // Show 6 categories on desktop, 5 on mobile initially
  const getInitialCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 6 : 5;
    }
    return 6;
  };
  
  const [initialCount] = useState(getInitialCount());
  const visibleCategories = showAll ? allCategories : allCategories.slice(0, initialCount);
  const hasMore = allCategories.length > initialCount;

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  return (
    <section className="py-16 bg-[#FFF7ED]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            → Explore AI Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Discover AI tools organized by use case and functionality
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {visibleCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isNewlyVisible = showAll && index >= initialCount;
            
            return (
              <div
                key={category.name}
                className={`group bg-white rounded-2xl p-6 border border-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isNewlyVisible ? 'animate-fade-in-up' : ''
                }`}
                onClick={() => handleCategoryClick(category.route)}
                style={{
                  animationDelay: isNewlyVisible ? `${(index - initialCount) * 100}ms` : '0ms'
                }}
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-xl bg-[#F97316]/10 group-hover:bg-[#F97316]/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-[#F97316] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#F97316] transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Hover underline effect */}
                  <div className="mt-3 h-0.5 bg-[#F97316] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && !showAll && (
          <div className="text-center">
            <Button
              onClick={handleLoadMore}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Load More Categories
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseCategories;