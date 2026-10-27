import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingAI from './FloatingAI';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      {!isAdminPage && <FloatingAI />}
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default Layout;
