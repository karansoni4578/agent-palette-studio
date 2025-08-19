import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const VoiceAudioCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Voice & Audio"
        title="Voice & Audio"
        description="Transform audio experiences with AI-powered voice and sound tools. Create, edit, and enhance audio content with cutting-edge technology."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default VoiceAudioCategory;