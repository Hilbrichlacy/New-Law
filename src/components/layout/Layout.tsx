import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../BackToTop';
import Chatbot from '../Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </div>
  );
};

export default Layout;