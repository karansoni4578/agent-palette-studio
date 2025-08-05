import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrowseCategories from "@/components/BrowseCategories";
import AgentGrid from "@/components/AgentGrid";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter, more realistic loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BrowseCategories />
      <AgentGrid />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
