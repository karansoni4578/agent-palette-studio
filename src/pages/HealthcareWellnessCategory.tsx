import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const HealthcareWellnessCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Healthcare & Wellness"
        title="Healthcare & Wellness"
        description="Advanced AI tools for healthcare, medical research, and wellness. Transform patient care and health outcomes with intelligent solutions."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default HealthcareWellnessCategory;