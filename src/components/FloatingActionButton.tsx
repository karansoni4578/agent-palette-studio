import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActionButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-full h-14 px-6 font-semibold hover-lift"
      >
        <Plus className="w-5 h-5 mr-2" />
        Submit Your Agent
      </Button>
    </div>
  );
};

export default FloatingActionButton;