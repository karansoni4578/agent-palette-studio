import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const DeveloperAPIsCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Developer APIs & Models"
        title="Developer APIs & Models"
        description="Comprehensive collection of AI APIs and models for developers. Integrate cutting-edge AI capabilities into your applications."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default DeveloperAPIsCategory;