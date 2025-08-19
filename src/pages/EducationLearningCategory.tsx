import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const EducationLearningCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Education & Learning"
        title="Education & Learning"
        description="Revolutionary AI tools for education and learning. Enhance teaching, accelerate learning, and create personalized educational experiences."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default EducationLearningCategory;