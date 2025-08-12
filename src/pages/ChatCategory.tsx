import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryModelsGrid from '@/components/CategoryModelsGrid';

const ChatCategory = () => {
  return (
    <>
      <Header />
      <CategoryModelsGrid 
        category="Chat & Conversation"
        title="Chat & Conversation"
        description="Discover AI models and agents designed for natural conversations, customer support, and interactive communication experiences."
      />
      <Footer />
    </>
  );
};

export default ChatCategory;