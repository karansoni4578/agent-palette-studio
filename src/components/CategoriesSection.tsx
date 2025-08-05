import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  subheading: string;
  tools: Tool[];
}

const categoriesData: Category[] = [
  {
    id: "chat",
    name: "Chat & Conversation",
    subheading: "Top AI agents for chat, messaging and automation",
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", description: "The most widely used AI chatbot by OpenAI.", tags: ["GPT-4", "Free", "Popular"] },
      { name: "Claude", url: "https://claude.ai", description: "Friendly AI assistant from Anthropic.", tags: ["Free", "Chatbot"] },
      { name: "Pi", url: "https://pi.ai", description: "Emotionally intelligent personal chatbot.", tags: ["Free", "Personal"] },
      { name: "Character.AI", url: "https://character.ai", description: "Chat with fictional & fan-made characters.", tags: ["Free", "Entertainment"] },
      { name: "Poe", url: "https://poe.com", description: "Multi-model chat (Claude, GPT-4, etc.)", tags: ["Multi-model", "Freemium"] },
      { name: "YouChat", url: "https://you.com/chat", description: "AI chat search assistant from You.com", tags: ["Search", "Free"] }
    ]
  },
  {
    id: "writing",
    name: "Writing & Content",
    subheading: "AI-powered content creation and writing assistants",
    tools: [
      { name: "Jasper AI", url: "https://www.jasper.ai", description: "AI copywriter for blogs & ads.", tags: ["Marketing", "Premium"] },
      { name: "Copy.ai", url: "https://www.copy.ai", description: "Templates + long-form content generator.", tags: ["Templates", "Freemium"] },
      { name: "Writesonic", url: "https://writesonic.com", description: "Fast writing + ChatSonic included.", tags: ["Fast", "Freemium"] },
      { name: "Notion AI", url: "https://notion.so/ai", description: "Built-in AI assistant in Notion.", tags: ["Productivity", "Premium"] },
      { name: "HyperWrite", url: "https://hyperwriteai.com", description: "Personal writing agent.", tags: ["Personal", "Freemium"] },
      { name: "Rytr", url: "https://rytr.me", description: "Budget-friendly AI writer.", tags: ["Budget", "Freemium"] }
    ]
  },
  {
    id: "image",
    name: "Image & Design",
    subheading: "Create stunning visuals and designs with AI",
    tools: [
      { name: "Midjourney", url: "https://midjourney.com", description: "Stunning AI art via Discord.", tags: ["Art", "Premium", "Discord"] },
      { name: "Leonardo.ai", url: "https://leonardo.ai", description: "AI image generator with styles.", tags: ["Styles", "Freemium"] },
      { name: "Playground AI", url: "https://playgroundai.com", description: "Free image editor/generator.", tags: ["Free", "Editor"] },
      { name: "Fotor AI", url: "https://fotor.com/features/ai", description: "One-click design generator.", tags: ["Design", "Easy"] },
      { name: "Stockimg AI", url: "https://stockimg.ai", description: "AI-based stock & poster design.", tags: ["Stock", "Posters"] },
      { name: "NightCafe", url: "https://creator.nightcafe.studio", description: "Style transfer + image creation.", tags: ["Style Transfer", "Free"] }
    ]
  },
  {
    id: "coding",
    name: "Coding & Developer Tools",
    subheading: "AI assistants for developers and programmers",
    tools: [
      { name: "GitHub Copilot", url: "https://github.com/features/copilot", description: "AI pair programmer.", tags: ["GitHub", "Premium", "Popular"] },
      { name: "Replit Ghostwriter", url: "https://replit.com/site/ghostwriter", description: "In-editor coding help.", tags: ["IDE", "Premium"] },
      { name: "Codeium", url: "https://codeium.com", description: "Free autocomplete for devs.", tags: ["Free", "Autocomplete"] },
      { name: "Phind", url: "https://phind.com", description: "AI search engine for developers.", tags: ["Search", "Free"] },
      { name: "Tabnine", url: "https://tabnine.com", description: "AI assistant for code suggestions.", tags: ["Suggestions", "Freemium"] },
      { name: "AskCodi", url: "https://askcodi.com", description: "Prompt-based code writing.", tags: ["Prompts", "Freemium"] }
    ]
  },
  {
    id: "productivity",
    name: "Productivity & Workflow",
    subheading: "Streamline your workflow with AI-powered tools",
    tools: [
      { name: "Motion", url: "https://usemotion.com", description: "AI-based calendar + task assistant.", tags: ["Calendar", "Premium"] },
      { name: "Superhuman AI", url: "https://superhuman.com", description: "Email writing automation.", tags: ["Email", "Premium"] },
      { name: "Mem AI", url: "https://mem.ai", description: "Smart note-taking with AI memory.", tags: ["Notes", "Premium"] },
      { name: "Taskade", url: "https://taskade.com", description: "AI-powered productivity workspace.", tags: ["Workspace", "Freemium"] },
      { name: "ClickUp AI", url: "https://clickup.com/ai", description: "Tasks, summaries, meeting notes.", tags: ["Tasks", "Premium"] },
      { name: "Magical AI", url: "https://getmagical.com", description: "Auto text expansion with AI.", tags: ["Automation", "Free"] }
    ]
  },
  {
    id: "voice",
    name: "Voice & Audio",
    subheading: "AI-powered voice generation and audio tools",
    tools: [
      { name: "ElevenLabs", url: "https://elevenlabs.io", description: "Realistic voice generation.", tags: ["Voice", "Premium"] },
      { name: "Play.ht", url: "https://play.ht", description: "AI voiceovers + TTS.", tags: ["TTS", "Freemium"] },
      { name: "Descript", url: "https://descript.com", description: "Edit audio/video like a doc.", tags: ["Editor", "Premium"] },
      { name: "Voicemod", url: "https://voicemod.net", description: "Real-time AI voice filters.", tags: ["Filters", "Freemium"] },
      { name: "Lovo.ai", url: "https://lovo.ai", description: "Voice generator for creators.", tags: ["Creators", "Premium"] },
      { name: "Murf AI", url: "https://murf.ai", description: "Voiceovers for business & education.", tags: ["Business", "Premium"] }
    ]
  },
  {
    id: "video",
    name: "Video & Animation",
    subheading: "Create and edit videos with AI technology",
    tools: [
      { name: "Runway ML", url: "https://runwayml.com", description: "AI video editor & effects.", tags: ["Editor", "Premium"] },
      { name: "Pika Labs", url: "https://pika.art", description: "AI-generated video from text.", tags: ["Text-to-Video", "Premium"] },
      { name: "Synthesia", url: "https://synthesia.io", description: "AI avatar video presenter.", tags: ["Avatar", "Premium"] },
      { name: "HeyGen", url: "https://heygen.com", description: "Create business explainers via AI.", tags: ["Business", "Premium"] },
      { name: "Animoto AI", url: "https://animoto.com", description: "Simple AI slideshow editor.", tags: ["Slideshow", "Freemium"] },
      { name: "Kaiber", url: "https://kaiber.ai", description: "AI music videos from photos.", tags: ["Music Video", "Premium"] }
    ]
  },
  {
    id: "data",
    name: "Data & Analytics",
    subheading: "AI-powered data analysis and insights",
    tools: [
      { name: "Chat with CSV", url: "https://csvexplorer.com", description: "Query CSVs via chat.", tags: ["CSV", "Free"] },
      { name: "Rows AI", url: "https://rows.com", description: "Smart spreadsheet with AI.", tags: ["Spreadsheet", "Freemium"] },
      { name: "PromptLoop", url: "https://promptloop.com", description: "Use GPT inside Sheets.", tags: ["Google Sheets", "Premium"] },
      { name: "Obviously AI", url: "https://obviously.ai", description: "No-code AI data prediction.", tags: ["No-code", "Premium"] },
      { name: "Graphext", url: "https://graphext.com", description: "AI-powered data insights.", tags: ["Insights", "Premium"] },
      { name: "Akkio", url: "https://akkio.com", description: "Predictive analytics tool.", tags: ["Analytics", "Premium"] }
    ]
  },
  {
    id: "finance",
    name: "Finance & Crypto",
    subheading: "AI tools for financial analysis and crypto trading",
    tools: [
      { name: "Delv AI", url: "https://delv.ai", description: "Research financial topics faster.", tags: ["Research", "Premium"] },
      { name: "Token Metrics", url: "https://tokenmetrics.com", description: "Crypto data & predictions.", tags: ["Crypto", "Premium"] },
      { name: "Numerai", url: "https://numer.ai", description: "AI-powered hedge fund.", tags: ["Hedge Fund", "Premium"] },
      { name: "Moralis", url: "https://moralis.io", description: "Web3 dev platform with AI edge.", tags: ["Web3", "API"] },
      { name: "Coinfeeds", url: "https://coinfeeds.io", description: "AI-powered crypto intelligence.", tags: ["Crypto", "Premium"] },
      { name: "FinChat.io", url: "https://finchat.io", description: "Chat with financial data.", tags: ["Finance", "Premium"] }
    ]
  },
  {
    id: "education",
    name: "Education & Learning",
    subheading: "AI tutors and learning assistants",
    tools: [
      { name: "Khanmigo", url: "https://khanacademy.org/khan-labs", description: "AI tutor by Khan Academy.", tags: ["Tutor", "Free"] },
      { name: "Elicit.org", url: "https://elicit.org", description: "Research paper AI assistant.", tags: ["Research", "Free"] },
      { name: "Scite.ai", url: "https://scite.ai", description: "Smart citation & fact-checking.", tags: ["Citations", "Premium"] },
      { name: "Socratic", url: "https://socratic.org", description: "AI for school questions.", tags: ["School", "Free"] },
      { name: "Diffit", url: "https://diffit.me", description: "Adapt learning materials with AI.", tags: ["Adaptive", "Freemium"] },
      { name: "Mindgrasp", url: "https://mindgrasp.ai", description: "Learn from PDFs & lectures faster.", tags: ["Study", "Premium"] }
    ]
  },
  {
    id: "marketing",
    name: "Marketing & SEO",
    subheading: "AI-powered marketing and SEO optimization tools",
    tools: [
      { name: "Surfer SEO", url: "https://surferseo.com", description: "Optimize AI-written content.", tags: ["SEO", "Premium"] },
      { name: "NeuronWriter", url: "https://neuronwriter.com", description: "SERP-driven content assistant.", tags: ["SERP", "Premium"] },
      { name: "GrowthBar", url: "https://growthbarseo.com", description: "Blog + keyword AI tool.", tags: ["Keywords", "Premium"] },
      { name: "Ocoya", url: "https://ocoya.com", description: "AI-powered social media posts.", tags: ["Social Media", "Freemium"] },
      { name: "Postwise", url: "https://postwise.ai", description: "Grow on Twitter using AI.", tags: ["Twitter", "Premium"] },
      { name: "Taplio", url: "https://taplio.com", description: "AI for LinkedIn growth.", tags: ["LinkedIn", "Premium"] }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare & Wellness",
    subheading: "AI assistants for health and medical applications",
    tools: [
      { name: "Woebot Health", url: "https://woebothealth.com", description: "Mental health AI chatbot.", tags: ["Mental Health", "Premium"] },
      { name: "HealthGPT", url: "https://www.healthgpt.ai", description: "Chat about symptoms & lifestyle.", tags: ["Health", "Free"] },
      { name: "MyGPT", url: "https://mygpt.healthcare", description: "AI assistant for healthcare workers.", tags: ["Healthcare", "Premium"] },
      { name: "BioGPT", url: "https://github.com/microsoft/biogpt", description: "Medical research model.", tags: ["Research", "Open Source"] },
      { name: "XploreBio", url: "https://xplorebio.ai", description: "Biological literature summarizer.", tags: ["Biology", "Premium"] },
      { name: "Myndlift AI", url: "https://myndlift.com", description: "Brain health tracking.", tags: ["Brain Health", "Premium"] }
    ]
  },
  {
    id: "apis",
    name: "Developer APIs & Models",
    subheading: "API access to powerful AI models and services",
    tools: [
      { name: "OpenAI API", url: "https://platform.openai.com", description: "GPT-4, Whisper, DALL·E", tags: ["API", "GPT-4", "Premium"] },
      { name: "Hugging Face", url: "https://huggingface.co", description: "Models, spaces, datasets", tags: ["Open Source", "API", "Free"] },
      { name: "Replicate", url: "https://replicate.com", description: "Run models via simple APIs", tags: ["API", "Premium"] },
      { name: "Cohere", url: "https://cohere.ai", description: "Embeddings, command models", tags: ["API", "Premium"] },
      { name: "Groq", url: "https://groq.com", description: "Fast inference APIs", tags: ["API", "Fast"] },
      { name: "Together.ai", url: "https://together.ai", description: "Hosted open-source LLMs", tags: ["API", "Open Source"] }
    ]
  },
  {
    id: "security",
    name: "Security & Legal",
    subheading: "AI tools for legal assistance and security",
    tools: [
      { name: "DoNotPay", url: "https://donotpay.com", description: "Legal AI assistant for consumers", tags: ["Legal", "Premium"] },
      { name: "Spellbook", url: "https://spellbook.legal", description: "Draft contracts using GPT", tags: ["Contracts", "Premium"] },
      { name: "CaseText", url: "https://casetext.com", description: "Legal research assistant", tags: ["Research", "Premium"] },
      { name: "Lexion", url: "https://lexion.ai", description: "Legal contract AI for businesses", tags: ["Business", "Premium"] },
      { name: "Lawgeex", url: "https://lawgeex.com", description: "AI legal review", tags: ["Review", "Premium"] },
      { name: "Kira Systems", url: "https://kirasystems.com", description: "AI document review", tags: ["Documents", "Premium"] }
    ]
  },
  {
    id: "experimental",
    name: "Experimental & Research Projects",
    subheading: "Cutting-edge AI research and experimental tools",
    tools: [
      { name: "AutoGPT", url: "https://github.com/Torantulino/Auto-GPT", description: "Autonomous agents", tags: ["Open Source", "Autonomous"] },
      { name: "AgentGPT", url: "https://agentgpt.reworkd.ai", description: "Browser-based agent runner", tags: ["Agents", "Free"] },
      { name: "BabyAGI", url: "https://github.com/yoheinakajima/babyagi", description: "Task-based agents", tags: ["Open Source", "Tasks"] },
      { name: "ChatDev", url: "https://github.com/openbmb/ChatDev", description: "Multi-role AI dev workflow", tags: ["Open Source", "Development"] },
      { name: "LangChain Hub", url: "https://hub.langchain.com", description: "Prompt + agent workflows", tags: ["Workflows", "Free"] },
      { name: "SMOL AI", url: "https://github.com/smol-ai/developer", description: "AI that builds apps", tags: ["Open Source", "Builder"] }
    ]
  }
];

const CategoriesSection = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Show first 6 categories on desktop, first 5 on mobile
  const visibleCategories = showAll ? categoriesData : categoriesData.slice(0, 6);

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">AI Tool Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the best AI tools across different categories to supercharge your workflow
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-12 md:gap-16">
          {visibleCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.subheading}</p>
              </div>

              {/* Tools Grid */}
              <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Tool Header */}
                    <div className="mb-3">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Visit Button */}
                    <Button
                      onClick={() => handleToolClick(tool.url)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      Visit Tool
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="px-8 py-3 text-lg"
            >
              Load More Categories ({categoriesData.length - 6} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;