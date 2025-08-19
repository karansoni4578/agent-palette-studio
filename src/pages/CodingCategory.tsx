import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const CodingCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Coding & Developer Tools"
        title="Coding & Developer Tools"
        description="Discover powerful AI tools that enhance your coding workflow, from intelligent code completion to automated testing and debugging."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default CodingCategory;