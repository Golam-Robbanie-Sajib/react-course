import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 font-inter">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isHomePage={isHomePage} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white/70 backdrop-blur-sm p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;