import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const MarketingSEOCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Marketing & SEO"
        title="Marketing & SEO"
        description="Supercharge your marketing and SEO efforts with AI-powered tools. Boost visibility, optimize content, and drive conversions."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default MarketingSEOCategory;