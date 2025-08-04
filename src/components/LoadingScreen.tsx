import { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
}

const LoadingScreen = ({ 
  message = "Starting AI Agent Zone...", 
  showProgress = true 
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Initializing neural networks...",
    "Loading AI agents database...",
    "Analyzing trending algorithms...",
    "Optimizing user experience...",
    "Ready to explore!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Robot Animation */}
        <div className="relative mb-8">
          {/* Robot Body */}
          <div className="relative mx-auto w-32 h-32 animate-pulse">
            {/* Main Body */}
            <div className="absolute inset-4 bg-gradient-to-b from-primary/20 to-primary/30 rounded-2xl border-2 border-primary/40 animate-[scale-in_1s_ease-out]">
              {/* Screen/Face */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-primary/80 rounded-lg flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-[fade-in_0.5s_ease-out_0s] opacity-0 animate-fade-in"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-[fade-in_0.5s_ease-out_0.2s] opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}></div>
                </div>
              </div>
              
              {/* Control Panel */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>

            {/* Robot Arms */}
            <div className="absolute top-8 -left-2 w-6 h-4 bg-primary/30 rounded-l-full animate-[slide-in-right_0.8s_ease-out_0.5s] opacity-0" style={{ animationFillMode: 'forwards' }}></div>
            <div className="absolute top-8 -right-2 w-6 h-4 bg-primary/30 rounded-r-full animate-[slide-in-right_0.8s_ease-out_0.7s] opacity-0" style={{ animationFillMode: 'forwards' }}></div>

            {/* Antenna */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-4 bg-primary/60 animate-[fade-in_0.5s_ease-out_1s] opacity-0" style={{ animationFillMode: 'forwards' }}></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-[scale-in_0.3s_ease-out_1.2s] opacity-0" style={{ animationFillMode: 'forwards' }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute -top-8 -left-8 w-2 h-2 bg-primary/40 rounded-full animate-[fade-in_2s_ease-out_infinite]"></div>
            <div className="absolute -top-6 -right-6 w-1 h-1 bg-primary/60 rounded-full animate-[fade-in_2s_ease-out_infinite_0.5s]"></div>
            <div className="absolute -bottom-4 -left-6 w-1.5 h-1.5 bg-primary/50 rounded-full animate-[fade-in_2s_ease-out_infinite_1s]"></div>
          </div>

          {/* Gear Animation */}
          <div className="absolute top-6 right-4 w-8 h-8 border-2 border-primary/30 rounded-full animate-spin">
            <div className="absolute inset-1 border border-primary/20 rounded-full"></div>
          </div>
          <div className="absolute bottom-6 left-4 w-6 h-6 border-2 border-primary/20 rounded-full animate-[spin_3s_linear_infinite_reverse]">
            <div className="absolute inset-1 border border-primary/10 rounded-full"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-foreground mb-4 animate-fade-in">
          {message}
        </h2>

        {/* Current Step */}
        <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {steps[currentStep]}
        </p>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full max-w-xs mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Spinning Loader */}
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Fun Easter Egg Text */}
        <p className="text-xs text-muted-foreground/60 mt-6 animate-fade-in" style={{ animationDelay: '2s' }}>
          🤖 Beep boop! Teaching robots to find the best AI tools...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;