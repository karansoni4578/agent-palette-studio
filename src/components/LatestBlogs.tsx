import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetchLatestBlogs();
  }, []);
  const fetchLatestBlogs = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog posts').select('id, title, image_url, slug, created_at').order('created_at', {
        ascending: false
      }).limit(5);
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

  // Auto-scroll like train effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || blogPosts.length === 0) return;

    let scrollSpeed = 0.5;
    let animationId: number;
    let isScrolling = false;

    const scroll = () => {
      if (scrollContainer && !isScrolling) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Reset to beginning when reaching the end for infinite scroll
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => { isScrolling = true; };
    const handleMouseLeave = () => { isScrolling = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [blogPosts]);

  // Preload images
  useEffect(() => {
    blogPosts.forEach(blog => {
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
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">📰 Latest from Our Blogs</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Auto-scrolling container */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* First set of blog cards */}
            {blogPosts.map(blog => (
              <Link 
                key={blog.id} 
                to={`/blog/${blog.slug}`} 
                className="group block flex-shrink-0 w-80 sm:w-96"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 30 }} 
                  className="h-24 sm:h-28 md:h-32 bg-card rounded-xl shadow-lg border border-border/50 p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {blog.image_url ? (
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
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
            ))}
            
            {/* Duplicate set for infinite scroll */}
            {blogPosts.map(blog => (
              <Link 
                key={`dup-${blog.id}`} 
                to={`/blog/${blog.slug}`} 
                className="group block flex-shrink-0 w-80 sm:w-96"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 30 }} 
                  className="h-24 sm:h-28 md:h-32 bg-card rounded-xl shadow-lg border border-border/50 p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {blog.image_url ? (
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" 
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
            ))}
          </div>
          
          {/* Fade gradients */}
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-[hsl(var(--accent)_/_0.1)] via-[hsl(var(--accent)_/_0.08)] to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-[hsl(var(--accent)_/_0.1)] via-[hsl(var(--accent)_/_0.08)] to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};
export default LatestBlogs;