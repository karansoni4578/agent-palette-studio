import { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ 
  message = "AI Agent Zone" 
}: LoadingScreenProps) => {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        {/* Simple Robot Icon */}
        <div className="mb-8 relative">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl border-2 border-primary/20 flex items-center justify-center relative animate-pulse">
            {/* Robot Face */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            {/* Simple antenna */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-primary/60"></div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {message}
        </h2>
        
        {/* Animated dots */}
        <p className="text-muted-foreground text-sm">
          Loading{dots}
        </p>

        {/* Simple spinner */}
        <div className="mt-6">
          <div className="w-6 h-6 mx-auto border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;