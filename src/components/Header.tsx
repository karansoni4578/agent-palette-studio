import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const categories = [
    { name: "Chat & Conversation", href: "/category/chat" },
    { name: "Writing & Content", href: "/category/writing" },
    { name: "Image & Design", href: "/category/image-design" },
    { name: "Coding & Developer Tools", href: "/category/coding" },
    { name: "Productivity & Workflow", href: "/category/productivity" },
    { name: "Voice & Audio", href: "/category/voice-audio" },
    { name: "Video & Animation", href: "/category/video-animation" },
    { name: "Data & Analytics", href: "/category/data-analytics" },
    { name: "Finance & Crypto", href: "/category/finance-crypto" },
    { name: "Education & Learning", href: "/category/education-learning" },
    { name: "Marketing & SEO", href: "/category/marketing-seo" },
    { name: "Healthcare & Wellness", href: "/category/healthcare-wellness" },
    { name: "Developer APIs & Models", href: "/category/developer-apis" },
    { name: "Security & Legal", href: "/category/security-legal" },
    { name: "Experimental & Research", href: "/category/experimental-research" }
  ];

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="AI Agent Zone" className="h-8 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Home
            </a>
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary orange-underline transition-colors font-medium">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto bg-background border border-border shadow-lg">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.href}>
                    <a 
                      href={category.href} 
                      className="w-full text-foreground hover:text-primary transition-colors"
                    >
                      {category.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="/blogs" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Blogs
            </a>
            <a href="#" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              About
            </a>
          </div>

          {/* CTA Button */}
          <Button 
            className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => window.location.href = '/submit'}
          >
            Submit Your Agent
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;