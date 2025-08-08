import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // Auto-cycle through blogs
  useEffect(() => {
    if (blogPosts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
    }, 3000); // 3 seconds per blog

    return () => clearInterval(interval);
  }, [blogPosts.length]);

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

  const currentBlog = blogPosts[currentIndex];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            📰 Latest from Our Blog
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Blog Carousel Container */}
        <div className="relative h-32 sm:h-36 overflow-hidden rounded-2xl bg-muted/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBlog.id}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.8
              }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <Link
                to={`/blog/${currentBlog.slug}`}
                className="w-full max-w-4xl"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-card rounded-xl shadow-lg border border-border/50 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {currentBlog.image_url ? (
                        <motion.img
                          src={currentBlog.image_url}
                          alt={currentBlog.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-lg font-bold">📰</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground line-clamp-2 leading-tight">
                        {currentBlog.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(currentBlog.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <div className="w-2 h-0.5 bg-primary rounded-full"></div>
                        <span className="text-sm text-primary font-medium">Read Article</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;