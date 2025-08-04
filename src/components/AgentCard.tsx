import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface AgentCardProps {
  name: string;
  description: string;
  logo: string;
  tags: string[];
  rating: number;
  users: string;
  isAgentOfTheDay?: boolean;
  isFree?: boolean;
  hasAPI?: boolean;
  websiteUrl?: string;
}

const AgentCard = ({ 
  name, 
  description, 
  logo, 
  tags, 
  rating, 
  users, 
  isAgentOfTheDay = false,
  isFree = false,
  hasAPI = false,
  websiteUrl
}: AgentCardProps) => {

  const handleClick = () => {
    if (websiteUrl) {
      window.open(websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <div 
      className="group bg-card rounded-2xl p-6 border border-border hover-lift cursor-pointer card-shadow hover:card-shadow-hover relative"
      onClick={handleClick}
    >
      {/* Agent of the Day Badge */}
      {isAgentOfTheDay && (
        <div className="absolute -top-3 -right-3">
          <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
            🏆 Agent of the Day
          </Badge>
        </div>
      )}
      
      {/* Header with Logo and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <img src={logo} alt={name} className="w-8 h-8 rounded-lg" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-primary fill-current" />
              <span className="text-sm text-foreground ml-1 font-medium">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{users} users</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Tags and Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {isFree && (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 text-xs">
            Free
          </Badge>
        )}
        {hasAPI && (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
            API Available
          </Badge>
        )}
      </div>

      {/* CTA Button */}
      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
        Visit Website →
      </Button>
    </div>
  );
};

export default AgentCard;