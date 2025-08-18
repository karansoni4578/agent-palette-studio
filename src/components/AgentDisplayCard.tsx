import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { Agent } from '@/hooks/useAgents';

interface AgentDisplayCardProps {
  agent: Agent;
}

const AgentDisplayCard = ({ agent }: AgentDisplayCardProps) => {
  const handleClick = () => {
    window.open(agent.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {agent.image_url ? (
              <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-muted">
                <img 
                  src={agent.image_url} 
                  alt={`${agent.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-orange-600 font-bold text-xl">
                  {agent.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
                {agent.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
            </div>
            
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {agent.description}
            </p>

            {/* Tags */}
            {agent.tags && agent.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {agent.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {tag}
                  </Badge>
                ))}
                {agent.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    +{agent.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Pricing Badge */}
            {agent.is_free !== undefined && (
              <div className="mt-3">
                <Badge 
                  variant={agent.is_free ? "default" : "secondary"}
                  className={agent.is_free ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                >
                  {agent.is_free ? "Free" : "Paid"}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentDisplayCard;