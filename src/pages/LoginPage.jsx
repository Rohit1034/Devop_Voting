import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Layout from '../components/layout/Layout';
import './AuthPages.css';

const LoginPage = () => {
  return (
    <Layout>
      <div className="auth-page">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
