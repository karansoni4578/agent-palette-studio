import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

interface BlogPost {
  id: string;
  title: string;
  image_url: string;
  slug: string;
  created_at: string;
}

const LatestBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blog posts')
        .select('id, title, image_url, slug, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-step carousel one-by-one through center
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 2200); // step every ~2.2s for smooth pacing

    return () => clearInterval(interval);
  }, [carouselApi]);

  // Preload images
  useEffect(() => {
    blogPosts.forEach((blog) => {
      if (blog.image_url) {
        const img = new Image();
        img.src = blog.image_url;
      }
    });
  }, [blogPosts]);

  if (loading || blogPosts.length === 0) {
    return null;
  }

  

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-accent/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            📰 Latest from Our Blog
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Center-locked carousel with medium cards */}
        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setCarouselApi}
          className="relative"
        >
          <CarouselContent className="h-24 sm:h-28 md:h-32">
            {blogPosts.map((blog) => (
              <CarouselItem
                key={blog.id}
                className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Link to={`/blog/${blog.slug}`} className="group block h-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="h-full bg-card rounded-xl shadow-lg border border-border/50 p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {blog.image_url ? (
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-lg font-bold">📰</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <div className="mt-2 w-16 h-0.5 bg-primary rounded-full"></div>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex" aria-label="Previous blog" />
          <CarouselNext className="hidden md:flex" aria-label="Next blog" />
        </Carousel>
      </div>
    </section>
  );
};

export default LatestBlogs;