import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Layout from '../components/layout/Layout';
import './AuthPages.css';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="auth-page">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
