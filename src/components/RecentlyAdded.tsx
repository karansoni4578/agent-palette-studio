"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentModelsAgents } from "@/hooks/useModelsAgents";
import { ExternalLink } from "lucide-react";

const ModelCard = ({ model, index }: { model: any; index: number }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleClick = () => {
    window.open(model.website_url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="flex-shrink-0 w-[280px] sm:w-[300px] bg-card rounded-2xl shadow-lg border border-border/50 p-4 sm:p-6 ml-4 sm:ml-6 first:ml-4 sm:first:ml-6 last:mr-4 sm:last:mr-6 transition-transform duration-200 cursor-pointer hover:shadow-xl relative"
      style={{ scrollSnapAlign: "start" }}
      onClick={handleClick}
    >
      {/* Pricing Badge */}
      <div className="absolute top-4 right-4">
        <Badge
          className={`text-xs px-2 py-1 ${
            model.pricing_type === "Free"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : model.pricing_type === "Paid"
              ? "bg-red-100 text-red-800 hover:bg-red-200"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          {model.pricing_type}
        </Badge>
      </div>

      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
          {model.logo_url && (
            <>
              {!imageLoaded && !imageError && (
                <Skeleton className="w-full h-full" />
              )}
              <img
                src={model.logo_url}
                alt={model.name}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            </>
          )}
          {(!model.logo_url || imageError) && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg font-bold">
                {model.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-12">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-foreground text-xs sm:text-sm leading-tight">
              {model.name}
            </h3>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed overflow-hidden mb-3 line-clamp-2">
            {model.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {model.tags.slice(0, 2).map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
            {model.tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{model.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Visit Button */}
          <div className="flex items-center gap-1 text-primary text-xs font-medium">
            <span>Visit Tool</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AutoCarousel = ({ models }: { models: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || models.length === 0) return;

    let animationId: number;
    const scrollSpeed = 2; // 🔥 ज्यादा speed (हर 2 सेकंड noticeable move)

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset seamless infinite loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [models]);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        ref={scrollRef}
        className="overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        <div className="flex w-max pb-4 gap-0">
          {models.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
          {/* Duplicate for seamless loop */}
          {models.map((model, index) => (
            <ModelCard
              key={`dup-${model.id}`}
              model={model}
              index={index + models.length}
            />
          ))}
        </div>
      </motion.div>

      {/* Fade Gradients */}
      <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

const RecentlyAdded = () => {
  const { models, loading, error } = useRecentModelsAgents(10);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recently Added
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the latest AI agents and models that have joined our
              curated collection
            </p>
          </motion.div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Unable to load models at the moment.
            </p>
          </div>
        )}

        {/* Carousel */}
        {!loading && !error && models.length > 0 && (
          <AutoCarousel models={models} />
        )}

        {/* No Models */}
        {!loading && !error && models.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No models available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;
