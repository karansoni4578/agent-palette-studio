import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';
import FloatingActionButton from '@/components/FloatingActionButton';

const ChatCategory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryModelsGrid 
        category="Chat & Conversation"
        title="Chat & Conversation"
        description="Discover AI models and agents designed for natural conversations, customer support, and interactive communication experiences."
      />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default ChatCategory;