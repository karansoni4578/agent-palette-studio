import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrowseCategories from "@/components/BrowseCategories";
import RecentlyAdded from "@/components/RecentlyAdded";
import TrendingAgents from "@/components/TrendingAgents";
import LatestBlogs from "@/components/LatestBlogs";
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
    <div className="min-h-screen bg-background max-w-full overflow-x-hidden">
      <Header />
      <Hero />
      <BrowseCategories />
      <RecentlyAdded />
      <TrendingAgents />
      <LatestBlogs />
      
      {/* Submit Tool CTA Section */}
      <section className="py-16 bg-secondary dark:bg-muted">
        <div className="container mx-auto px-4 max-w-full">
          <div className="text-center">
            <div 
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-colors duration-300 cursor-pointer text-lg dark:orange-gradient-bg dark:hover-glow"
              onClick={() => window.location.href = '/submit'}
            >
              <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                → Want your tool featured? Submit It
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
