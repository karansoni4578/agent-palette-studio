import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const ProductivityCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Productivity & Workflow"
        title="Productivity & Workflow"
        description="Maximize efficiency with AI-powered productivity tools. Streamline workflows, automate tasks, and boost your daily productivity."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default ProductivityCategory;