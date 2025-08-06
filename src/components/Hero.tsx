import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SearchModal from "./SearchModal";

const Hero = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Discover Amazing{" "}
            <span className="text-primary">AI Agents</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find the perfect AI tools and agents for your workflow. From chatbots to automation, discover cutting-edge AI solutions.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div 
              className="relative cursor-pointer"
              onClick={handleSearchClick}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
              <Input
                placeholder="Search AI Agents..."
                className="pl-12 pr-4 py-6 text-lg border-2 border-border focus:border-primary bg-card rounded-2xl shadow-lg cursor-pointer"
                readOnly
              />
            </div>
          </div>
        </div>
      </section>
      
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

export default Hero;