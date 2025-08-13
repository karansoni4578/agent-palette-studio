import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const ProductivityCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Productivity & Workflow"
        title="Productivity & Workflow"
        description="Maximize efficiency with AI-powered productivity tools. Streamline workflows, automate tasks, and boost your daily productivity."
      />
      <Footer />
    </>
  );
};

export default ProductivityCategory;