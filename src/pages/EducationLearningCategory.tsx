import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const EducationLearningCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Education & Learning"
        title="Education & Learning"
        description="Revolutionary AI tools for education and learning. Enhance teaching, accelerate learning, and create personalized educational experiences."
      />
      <Footer />
    </>
  );
};

export default EducationLearningCategory;