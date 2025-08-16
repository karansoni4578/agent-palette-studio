import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User } from "lucide-react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  tags: string;
  author: string;
  created_at: string;
  slug: string;
  meta_title: string;
  meta_description: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      // Try to fetch by slug first, then fallback to ID
      let { data, error } = await supabase
        .from('blog posts')
        .select('id, title, content, image_url, tags, author, created_at, slug, meta_title, meta_description')
        .eq('slug', slug)
        .maybeSingle();

      if (!data && !error) {
        // Fallback to ID if slug doesn't work
        const { data: dataById, error: errorById } = await supabase
          .from('blog posts')
          .select('id, title, content, image_url, tags, author, created_at, slug, meta_title, meta_description')
          .eq('id', slug)
          .maybeSingle();
        
        data = dataById;
        error = errorById;
      }

      if (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
        return;
      }

      if (!data) {
        setNotFound(true);
        return;
      }

      setBlogPost(data);
    } catch (error) {
      console.error('Error:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMetaTitle = () => {
    if (!blogPost) return "Blog Post";
    return blogPost.meta_title || blogPost.title || "Blog Post";
  };

  const getMetaDescription = () => {
    if (!blogPost) return "";
    if (blogPost.meta_description) return blogPost.meta_description;
    if (blogPost.content) {
      return blogPost.content.substring(0, 150).replace(/\s+/g, ' ').trim() + '...';
    }
    return "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !blogPost) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/blogs" 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blogs</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={getMetaTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="article" />
        {blogPost?.image_url && (
          <meta property="og:image" content={blogPost.image_url} />
        )}
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getMetaTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        {blogPost?.image_url && (
          <meta name="twitter:image" content={blogPost.image_url} />
        )}
        
        {/* Article specific meta */}
        {blogPost && (
          <>
            <meta property="article:author" content={blogPost.author || "Anonymous"} />
            <meta property="article:published_time" content={blogPost.created_at} />
            {blogPost.tags && (
              <meta property="article:tag" content={blogPost.tags} />
            )}
          </>
        )}
      </Helmet>
      <Header />
      
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/blogs" 
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {blogPost.tags || "Blog"}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{blogPost.author || "Anonymous"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blogPost.created_at)}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blogPost.image_url && (
            <div className="mb-12">
              <img 
                src={blogPost.image_url} 
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blogPost.content, {
                  ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'a'],
                  ALLOWED_ATTR: ['href', 'target', 'rel']
                })
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <p className="text-sm text-muted-foreground">Published by</p>
                <p className="font-semibold text-foreground">{blogPost.author || "Anonymous"}</p>
              </div>
              
              <Link 
                to="/blogs" 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;