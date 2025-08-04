import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  PenTool, 
  Palette, 
  Code, 
  Zap, 
  Mic, 
  Video, 
  BarChart3, 
  DollarSign, 
  GraduationCap, 
  Megaphone, 
  Heart, 
  Settings, 
  Shield, 
  Beaker 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  {
    name: "Chat & Conversation",
    description: "Smart AI chatbots for support, messaging, and automation",
    icon: MessageCircle,
    route: "/category/chat"
  },
  {
    name: "Writing & Content",
    description: "AI tools for copywriting, blogging, and content creation",
    icon: PenTool,
    route: "/category/writing"
  },
  {
    name: "Image & Design",
    description: "AI-powered image generation, editing, and design tools",
    icon: Palette,
    route: "/category/design"
  },
  {
    name: "Coding & Developer Tools",
    description: "AI assistants for programming, debugging, and code review",
    icon: Code,
    route: "/category/coding"
  },
  {
    name: "Productivity & Workflow",
    description: "Automation tools to streamline tasks and boost efficiency",
    icon: Zap,
    route: "/category/automation"
  },
  {
    name: "Voice & Audio",
    description: "Speech synthesis, voice cloning, and audio processing",
    icon: Mic,
    route: "/category/voice"
  },
  {
    name: "Video & Animation",
    description: "AI video creation, editing, and animation platforms",
    icon: Video,
    route: "/category/video"
  },
  {
    name: "Data & Analytics",
    description: "AI-driven insights, reporting, and data visualization",
    icon: BarChart3,
    route: "/category/analytics"
  },
  {
    name: "Finance & Crypto",
    description: "Trading bots, portfolio management, and financial analysis",
    icon: DollarSign,
    route: "/category/finance"
  },
  {
    name: "Education & Learning",
    description: "AI tutors, course creation, and personalized learning",
    icon: GraduationCap,
    route: "/category/education"
  },
  {
    name: "Marketing & SEO",
    description: "AI tools for digital marketing, SEO, and growth hacking",
    icon: Megaphone,
    route: "/category/marketing"
  },
  {
    name: "Healthcare & Wellness",
    description: "Medical AI, fitness tracking, and wellness optimization",
    icon: Heart,
    route: "/category/healthcare"
  },
  {
    name: "Developer APIs & Models",
    description: "Machine learning models, APIs, and development frameworks",
    icon: Settings,
    route: "/category/apis"
  },
  {
    name: "Security & Legal",
    description: "AI for cybersecurity, compliance, and legal document analysis",
    icon: Shield,
    route: "/category/security"
  },
  {
    name: "Experimental & Research",
    description: "Cutting-edge AI projects and experimental technologies",
    icon: Beaker,
    route: "/category/experimental"
  }
];

const ExploreCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-warm-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore AI Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find AI agents by use-case — from chatbots to video creators, writing tools and more.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card border-border hover:border-orange-primary/20"
                onClick={() => handleCategoryClick(category.route)}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-2xl bg-orange-primary/10 group-hover:bg-orange-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-orange-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-orange-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Hover underline effect */}
                  <div className="mt-4 h-0.5 bg-orange-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            → Categories are continuously updated as new AI use-cases emerge.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExploreCategories;