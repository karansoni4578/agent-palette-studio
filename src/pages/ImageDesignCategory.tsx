import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const ImageDesignCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Image & Design"
        title="Image & Design"
        description="Creative AI models for image generation, photo editing, graphic design, and visual content creation."
      />
      <Footer />
    </>
  );
};

export default ImageDesignCategory;