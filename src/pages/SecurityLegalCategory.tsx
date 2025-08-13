import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const SecurityLegalCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Security & Legal"
        title="Security & Legal"
        description="AI-powered security and legal tools to protect your business and ensure compliance. Enhance cybersecurity and streamline legal processes."
      />
      <Footer />
    </>
  );
};

export default SecurityLegalCategory;