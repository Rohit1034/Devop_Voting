import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './hooks/useTheme';
import { useScrollToTop } from './hooks/useScrollToTop';
import { ROUTES } from './utils/constants';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VoterListPage from './pages/VoterListPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import Toast from './components/common/Toast';

// Styles
import './App.css';
import './styles/globals.css';

// Theme wrapper component
const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return children;
};

// Scroll to top component
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

function App() {
  return (
    <AuthProvider>
      <ThemeWrapper>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route 
                path={ROUTES.LOGIN} 
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path={ROUTES.REGISTER} 
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                } 
              />

              {/* Protected Routes */}
              <Route 
                path={ROUTES.HOME} 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path={ROUTES.VOTER_LIST} 
                element={
                  <ProtectedRoute>
                    <VoterListPage />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Global Toast Notifications */}
            <Toast />
          </div>
        </Router>
      </ThemeWrapper>
    </AuthProvider>
  );
}

export default App;
