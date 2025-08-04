import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Agent = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website_url: string;
  tags: string[];
  rating: number;
  users: string;
  is_free: boolean;
  has_api: boolean;
  category: string;
  trend_score: number;
  last_updated: string;
  created_at: string;
};

// Initialize the agents table with popular AI tools
export const initializeAgentsData = async () => {
  const initialAgents = [
    {
      name: "ChatGPT",
      description: "Advanced conversational AI that can help with writing, analysis, coding, and creative tasks. Perfect for daily productivity.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      website_url: "https://chat.openai.com",
      tags: ["Chat", "Writing", "Coding"],
      rating: 4.9,
      users: "100M+",
      is_free: true,
      has_api: true,
      category: "Chat",
      trend_score: 95
    },
    {
      name: "GitHub Copilot",
      description: "AI-powered coding assistant that helps write, debug, and optimize code across multiple programming languages.",
      logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
      website_url: "https://github.com/features/copilot",
      tags: ["Coding", "Development", "Debug"],
      rating: 4.8,
      users: "5M+",
      is_free: false,
      has_api: true,
      category: "Coding",
      trend_score: 88
    },
    {
      name: "Grammarly",
      description: "AI writing assistant that helps improve grammar, clarity, and style in your writing across all platforms.",
      logo: "https://static.grammarly.com/assets/files/efe57d016d9efff36da7884c193b646b/grammarly_logo_420x200.png",
      website_url: "https://grammarly.com",
      tags: ["Writing", "Grammar", "Content"],
      rating: 4.7,
      users: "30M+",
      is_free: true,
      has_api: true,
      category: "Writing",
      trend_score: 82
    },
    {
      name: "Claude",
      description: "Anthropic's AI assistant for analysis, research, creative writing, and complex reasoning tasks.",
      logo: "https://cdn.sanity.io/images/4zrzovbb/website/e77dc0d312fef29db6ba2c53bb1c1512be8b0776-512x512.png",
      website_url: "https://claude.ai",
      tags: ["Chat", "Analysis", "Research"],
      rating: 4.8,
      users: "10M+",
      is_free: true,
      has_api: true,
      category: "Chat",
      trend_score: 85
    },
    {
      name: "Midjourney",
      description: "AI art generator that creates stunning, high-quality images from text descriptions.",
      logo: "https://cdn.sanity.io/images/4zrzovbb/website/a4b8b2c7c8e5e4e5b1e4e4e4e4e4e4e4e4e4e4e4-512x512.png",
      website_url: "https://midjourney.com",
      tags: ["Art", "Design", "Creative"],
      rating: 4.9,
      users: "15M+",
      is_free: false,
      has_api: false,
      category: "Design",
      trend_score: 90
    },
    {
      name: "Zapier",
      description: "Workflow automation platform that connects your favorite apps and services to save time on repetitive tasks.",
      logo: "https://cdn.zapier.com/storage/photos/9dd0f2a0b00b36b1d6c3c5d6e6e6e6e6.png",
      website_url: "https://zapier.com",
      tags: ["Automation", "Workflow", "Integration"],
      rating: 4.6,
      users: "5M+",
      is_free: true,
      has_api: true,
      category: "Automation",
      trend_score: 75
    },
    {
      name: "Perplexity AI",
      description: "AI-powered search engine that provides accurate answers with citations and real-time information.",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_muB0dDMG5LWRo6KXD4_qGJy2LjBcjjHPplEa4eOOKZhh8Q=s900-c-k-c0x00ffffff-no-rj",
      website_url: "https://perplexity.ai",
      tags: ["Search", "Research", "Information"],
      rating: 4.7,
      users: "20M+",
      is_free: true,
      has_api: true,
      category: "Research",
      trend_score: 80
    },
    {
      name: "Notion AI",
      description: "AI-powered workspace that helps with writing, brainstorming, and organizing your thoughts and projects.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
      website_url: "https://notion.so",
      tags: ["Productivity", "Writing", "Organization"],
      rating: 4.5,
      users: "35M+",
      is_free: true,
      has_api: true,
      category: "Productivity",
      trend_score: 78
    },
    {
      name: "Runway ML",
      description: "AI-powered creative suite for video editing, image generation, and multimedia content creation.",
      logo: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/erkxwhl1gd48xfhe2yld",
      website_url: "https://runwayml.com",
      tags: ["Video", "Creative", "AI"],
      rating: 4.6,
      users: "3M+",
      is_free: true,
      has_api: true,
      category: "Creative",
      trend_score: 73
    },
    {
      name: "Copy.ai",
      description: "AI writing tool for creating marketing copy, blog posts, and content that converts.",
      logo: "https://assets-global.website-files.com/61a700ce3c1e3dbf88b9b7db/61a700ce3c1e3d89c8b9b842_copy-ai-logo.svg",
      website_url: "https://copy.ai",
      tags: ["Writing", "Marketing", "Content"],
      rating: 4.4,
      users: "8M+",
      is_free: true,
      has_api: true,
      category: "Writing",
      trend_score: 70
    }
  ];

  try {
    const { data: existingAgents } = await supabase
      .from('agents')
      .select('id')
      .limit(1);

    if (!existingAgents || existingAgents.length === 0) {
      const { data, error } = await supabase
        .from('agents')
        .insert(initialAgents);

      if (error) {
        console.error('Error initializing agents data:', error);
      } else {
        console.log('Agents data initialized successfully');
      }
    }
  } catch (error) {
    console.error('Error checking/initializing agents:', error);
  }
};

// Get trending agents based on trend score
export const getTrendingAgents = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('trend_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching trending agents:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTrendingAgents:', error);
    return [];
  }
};

// Update agent trend scores (this would be called by a daily cron job)
export const updateTrendScores = async () => {
  try {
    // Simulate trend score updates (in real app, this would call Google Trends API)
    const randomUpdates = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      trend_score: Math.floor(Math.random() * 100) + 1
    }));

    for (const update of randomUpdates) {
      await supabase
        .from('agents')
        .update({ 
          trend_score: update.trend_score,
          last_updated: new Date().toISOString()
        })
        .eq('id', update.id);
    }

    console.log('Trend scores updated successfully');
  } catch (error) {
    console.error('Error updating trend scores:', error);
  }
};