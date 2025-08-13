import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const ExperimentalResearchCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Experimental & Research Projects"
        title="Experimental & Research Projects"
        description="Cutting-edge experimental AI tools and research projects. Explore the future of artificial intelligence and emerging technologies."
      />
      <Footer />
    </>
  );
};

export default ExperimentalResearchCategory;