import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { ModelAgent } from '@/hooks/useModelsAgents';

interface ModelAgentCardProps {
  model: ModelAgent;
  className?: string;
}

const ModelAgentCard: React.FC<ModelAgentCardProps> = ({ model, className = "" }) => {
  const handleToolClick = () => {
    window.open(model.website_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`group bg-white rounded-2xl p-6 border border-gray-200 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg relative ${className}`}
      onClick={handleToolClick}
    >
      {/* Pricing Badge */}
      <div className="absolute top-4 right-4">
        <Badge 
          className={`text-xs px-2 py-1 ${
            model.pricing_type === 'Free'
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : model.pricing_type === 'Paid'
              ? 'bg-red-100 text-red-800 hover:bg-red-200'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {model.pricing_type}
        </Badge>
      </div>

      {/* Logo */}
      {model.logo_url && (
        <div className="w-16 h-16 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={model.logo_url} 
            alt={model.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-[#F97316] transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {model.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {model.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {model.tags.slice(0, 3).map((tag) => (
          <Badge 
            key={tag} 
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs px-2 py-1"
          >
            {tag}
          </Badge>
        ))}
        {model.tags.length > 3 && (
          <Badge className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
            +{model.tags.length - 3} more
          </Badge>
        )}
      </div>

      {/* Visit Button */}
      <Button
        className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
        onClick={(e) => {
          e.stopPropagation();
          handleToolClick();
        }}
      >
        Visit Tool
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ModelAgentCard;