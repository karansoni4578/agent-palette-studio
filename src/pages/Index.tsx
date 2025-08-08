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
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BrowseCategories />
      <RecentlyAdded />
      <TrendingAgents />
      <LatestBlogs />
      
      {/* Submit Tool CTA Section */}
      <section className="py-16 bg-[#FFF7ED]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div 
              className="inline-flex items-center bg-[#F97316] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#EA580C] transition-colors duration-300 cursor-pointer text-lg"
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
