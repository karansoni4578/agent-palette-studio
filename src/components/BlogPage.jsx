import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog posts')
        .select('id, title, content, image_url, tags, author, created_at, slug, meta_title, meta_description')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
        return;
      }

      if (!data) {
        setError('Blog post not found');
        return;
      }

      setBlog(data);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    if (!blog) return 'Blog Post';
    return blog.meta_title || blog.title || 'Blog Post';
  };

  const getMetaDescription = () => {
    if (!blog) return '';
    if (blog.meta_description) return blog.meta_description;
    if (blog.content) {
      return blog.content.substring(0, 150).replace(/\s+/g, ' ').trim() + '...';
    }
    return '';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Helmet>
          <title>Blog Post Not Found</title>
          <meta name="description" content="The requested blog post could not be found." />
        </Helmet>
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="article" />
        {blog.image_url && <meta property="og:image" content={blog.image_url} />}
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        {blog.image_url && <meta name="twitter:image" content={blog.image_url} />}
        
        {/* Article specific meta */}
        <meta property="article:author" content={blog.author || 'Anonymous'} />
        <meta property="article:published_time" content={blog.created_at} />
        {blog.tags && <meta property="article:tag" content={blog.tags} />}
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/blogs" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          {blog.tags && (
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
              {blog.tags}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-gray-600">
            {blog.author && (
              <span className="font-medium">{blog.author}</span>
            )}
            <span>•</span>
            <time dateTime={blog.created_at}>
              {formatDate(blog.created_at)}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image_url && (
          <div className="mb-12">
            <img 
              src={blog.image_url} 
              alt={blog.title}
              className="w-full h-64 md:h-96 object-contain rounded-lg shadow-lg bg-muted"
            />
          </div>
        )}

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content, {
                ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'a'],
                ALLOWED_ATTR: ['href', 'target', 'rel']
              })
            }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <p className="text-sm text-gray-600">Published by</p>
              <p className="font-semibold text-gray-900">{blog.author || 'Anonymous'}</p>
            </div>
            
            <Link 
              to="/blogs" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read More Articles
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPage;