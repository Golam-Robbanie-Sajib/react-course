import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isHomePage={isHomePage} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;