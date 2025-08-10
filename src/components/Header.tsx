import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";
// Logo will be referenced directly from uploads

const Header = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/3be4ca71-2849-4870-8b9b-226aed931d60.png" alt="AI Agent Zone" className="h-14 w-auto" />
            <div className="text-3xl font-bold">
              <span className="text-foreground">AI Agent</span>
              <span className="text-primary ml-1">Zone</span>
            </div>
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
      
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </header>
  );
};

export default Header;