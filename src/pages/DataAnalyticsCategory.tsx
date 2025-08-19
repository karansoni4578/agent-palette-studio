import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const DataAnalyticsCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Data & Analytics"
        title="Data & Analytics"
        description="Powerful AI tools for data analysis, visualization, and insights. Transform your raw data into actionable intelligence."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default DataAnalyticsCategory;