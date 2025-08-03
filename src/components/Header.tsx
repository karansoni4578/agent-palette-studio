import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const Header = () => {
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
            <a href="#" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Categories
            </a>
            <a href="#" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Submit Agent
            </a>
            <a href="#" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              About
            </a>
          </div>

          {/* CTA Button */}
          <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Submit Your Agent
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </nav>

      {/* Compact Hero Section */}
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Discover Amazing{" "}
          <span className="text-primary">AI Agents</span>
        </h1>
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
            <Input
              placeholder="Search AI Agents..."
              className="pl-12 pr-4 py-3 border-2 border-border focus:border-primary bg-card rounded-xl shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;