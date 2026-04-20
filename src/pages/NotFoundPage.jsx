import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="not-found-page">
        <Card className="not-found-card" padding="large">
          <div className="not-found-content">
            <div className="not-found-icon">🍳</div>
            <h1 className="not-found-title">Page Not Found</h1>
            <p className="not-found-message">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="not-found-actions">
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate(ROUTES.HOME)}
                icon="🏠"
              >
                Go to Home
              </Button>
              
              <Button
                variant="outline"
                size="large"
                onClick={() => navigate(-1)}
                icon="←"
              >
                Go Back
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
