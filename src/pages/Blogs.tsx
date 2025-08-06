import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of AI Agents: Transforming Digital Workflows",
      excerpt: "Explore how AI agents are revolutionizing productivity and automation across industries, from customer service to content creation.",
      author: "Sarah Chen",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "AI Trends",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Best Practices for Implementing AI in Your Business",
      excerpt: "Learn essential strategies for successfully integrating AI tools into your workflow, including team training and tool selection.",
      author: "Mike Rodriguez",
      date: "December 12, 2024",
      readTime: "7 min read",
      category: "Business",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "The Future of AI Coding Assistants",
      excerpt: "Discover how AI-powered coding tools are changing software development and what developers can expect in the coming years.",
      author: "Alex Thompson",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&h=300&fit=crop"
    },
    {
      id: 4,
      title: "AI Ethics: Building Responsible AI Agents",
      excerpt: "Understanding the importance of ethical AI development and how to ensure your AI agents operate responsibly and transparently.",
      author: "Dr. Emily Johnson",
      date: "December 8, 2024",
      readTime: "8 min read",
      category: "Ethics",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Getting Started with AI Voice Assistants",
      excerpt: "A comprehensive guide to choosing and implementing AI voice technology for your personal or business needs.",
      author: "James Wilson",
      date: "December 5, 2024",
      readTime: "4 min read",
      category: "Voice AI",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=300&fit=crop"
    },
    {
      id: 6,
      title: "AI Image Generation: From Concept to Creation",
      excerpt: "Master the art of AI image generation with tips on prompting, style selection, and creative workflows using modern AI tools.",
      author: "Lisa Park",
      date: "December 3, 2024",
      readTime: "6 min read",
      category: "Creative AI",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=600&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Insights & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights in the world of AI agents and artificial intelligence.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <Badge variant="secondary" className="mb-4">
                {blogPosts[0].category}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{blogPosts[0].date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-muted/30">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to our newsletter and never miss the latest AI insights and tool discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;