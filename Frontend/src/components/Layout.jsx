import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingAI from './FloatingAI';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <FloatingAI />
      <Footer />
    </div>
  );
};

export default Layout;
