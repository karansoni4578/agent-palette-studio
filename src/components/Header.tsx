import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Menu } from "lucide-react";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";
// Logo will be referenced directly from uploads

const Header = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const categories = [{
    name: "Chat & Conversation",
    href: "/category/chat"
  }, {
    name: "Writing & Content",
    href: "/category/writing"
  }, {
    name: "Image & Design",
    href: "/category/image-design"
  }, {
    name: "Coding & Developer Tools",
    href: "/category/coding"
  }, {
    name: "Productivity & Workflow",
    href: "/category/productivity"
  }, {
    name: "Voice & Audio",
    href: "/category/voice-audio"
  }, {
    name: "Video & Animation",
    href: "/category/video-animation"
  }, {
    name: "Data & Analytics",
    href: "/category/data-analytics"
  }, {
    name: "Finance & Crypto",
    href: "/category/finance-crypto"
  }, {
    name: "Education & Learning",
    href: "/category/education-learning"
  }, {
    name: "Marketing & SEO",
    href: "/category/marketing-seo"
  }, {
    name: "Healthcare & Wellness",
    href: "/category/healthcare-wellness"
  }, {
    name: "Developer APIs & Models",
    href: "/category/developer-apis"
  }, {
    name: "Security & Legal",
    href: "/category/security-legal"
  }, {
    name: "Experimental & Research",
    href: "/category/experimental-research"
  }];
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src="/lovable-uploads/3be4ca71-2849-4870-8b9b-226aed931d60.png" 
              alt="AI Agent Zone" 
              className="h-10 md:h-14 w-auto" 
            />
            <div className="text-lg md:text-3xl font-bold">
              <span className="text-foreground">AI Agent</span>
              <span className="text-primary ml-1">Zone</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
                {categories.map(category => (
                  <DropdownMenuItem key={category.href}>
                    <a href={category.href} className="w-full text-foreground hover:text-primary transition-colors">
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

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Search Button - Always visible */}
            <Button 
              variant="ghost" 
              size={isMobile ? "sm" : "default"}
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Desktop CTA Button */}
            <Button 
              className="hidden lg:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm xl:text-base px-3 xl:px-4" 
              onClick={() => window.location.href = '/submit-agent'}
            >
              Submit Agent
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-3 pt-4">
              <a 
                href="/" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Mobile Categories */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between text-foreground hover:text-primary transition-colors font-medium py-2 w-full text-left">
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-h-60 overflow-y-auto bg-background border border-border shadow-lg">
                  {categories.map(category => (
                    <DropdownMenuItem key={category.href}>
                      <a 
                        href={category.href} 
                        className="w-full text-foreground hover:text-primary transition-colors text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <a 
                href="/blogs" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </a>
              
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>

              {/* Mobile CTA Button */}
              <Button 
                className="mt-3 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" 
                onClick={() => {
                  window.location.href = '/submit-agent';
                  setIsMobileMenuOpen(false);
                }}
              >
                Submit Your Agent
              </Button>
            </div>
          </div>
        )}
      </nav>
      
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </header>
  );
};
export default Header;