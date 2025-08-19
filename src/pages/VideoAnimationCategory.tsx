import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const VideoAnimationCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Video & Animation"
        title="Video & Animation"
        description="Create stunning videos and animations with AI-powered tools. Transform your creative vision into compelling visual content."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default VideoAnimationCategory;