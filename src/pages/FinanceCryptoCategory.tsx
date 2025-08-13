import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const FinanceCryptoCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Finance & Crypto"
        title="Finance & Crypto"
        description="AI-powered tools for financial analysis, trading, and cryptocurrency management. Make smarter investment decisions with artificial intelligence."
      />
      <Footer />
    </>
  );
};

export default FinanceCryptoCategory;