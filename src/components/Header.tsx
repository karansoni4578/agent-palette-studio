import { Button } from "@/components/ui/button";
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
            <a href="/" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Categories
            </a>
            <a href="/submit" className="text-foreground hover:text-primary orange-underline transition-colors font-medium">
              Submit Agent
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