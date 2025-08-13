import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const CodingCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Coding & Developer Tools"
        title="Coding & Developer Tools"
        description="Discover powerful AI tools that enhance your coding workflow, from intelligent code completion to automated testing and debugging."
      />
      <Footer />
    </>
  );
};

export default CodingCategory;