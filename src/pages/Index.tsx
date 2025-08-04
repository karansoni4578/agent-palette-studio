import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AgentGrid from "@/components/AgentGrid";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Welcome to AI Agent Zone" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <AgentGrid />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
