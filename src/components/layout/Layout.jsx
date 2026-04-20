import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isAuthPage = [ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname);
  const showHeader = user && !isAuthPage;
  const showFooter = !isAuthPage;

  return (
    <div className="layout">
      {showHeader && <Header />}
      
      <main className={`layout-main ${showHeader ? 'layout-main-with-header' : ''}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
