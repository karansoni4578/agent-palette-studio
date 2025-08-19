import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const FinanceCryptoCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Finance & Crypto"
        title="Finance & Crypto"
        description="AI-powered tools for financial analysis, trading, and cryptocurrency management. Make smarter investment decisions with artificial intelligence."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default FinanceCryptoCategory;