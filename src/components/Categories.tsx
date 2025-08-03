import { MessageCircle, PenTool, Code, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Chat",
    icon: MessageCircle,
    description: "Conversational AI agents",
    count: 9,
    color: "bg-primary/10 text-primary"
  },
  {
    name: "Writing",
    icon: PenTool,
    description: "Content creation tools",
    count: 8,
    color: "bg-primary/10 text-primary"
  },
  {
    name: "Coding",
    icon: Code,
    description: "Development assistants",
    count: 8,
    color: "bg-primary/10 text-primary"
  },
  {
    name: "Automation",
    icon: Zap,
    description: "Workflow automation",
    count: 8,
    color: "bg-primary/10 text-primary"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    switch (categoryName) {
      case "Chat":
      navigate("/category/chat");
        break;
      case "Writing":
        navigate("/category/writing");
        break;
      case "Coding":
        navigate("/category/coding");
        break;
      case "Automation":
        navigate("/category/automation");
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover AI agents organized by their primary use cases and capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="group bg-card rounded-2xl p-8 text-center border border-border hover-lift cursor-pointer card-shadow hover:card-shadow-hover"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {category.count} agents
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;