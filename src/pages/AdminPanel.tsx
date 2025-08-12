import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminModelForm from '@/components/AdminModelForm';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-[#FDF4E3]">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Admin Panel
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Add and manage AI models and agents
          </p>
        </div>

        <AdminModelForm />
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;