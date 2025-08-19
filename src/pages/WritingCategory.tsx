import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const WritingCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Writing & Content"
        title="Writing & Content"
        description="Powerful AI tools for content creation, copywriting, editing, and generating high-quality written materials."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default WritingCategory;