import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { validateFormData } from '../../utils/validation';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import toast from 'react-hot-toast';
import './AuthForms.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await loginUser(formData.phone, formData.password);
      
      if (result.success) {
        toast.success('Welcome back!');
        navigate(ROUTES.HOME);
      } else {
        toast.error(result.error);
        setErrors({ general: result.error });
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" padding="large">
        <div className="auth-header">
          <img src="/logo.png" alt="Logo" className="header-logo-image" />
          <h1 className="auth-title">GDC'S HighTEA</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="auth-error-general">
              {errors.general}
            </div>
          )}

          <Input
            name="phone"
            type="tel"
            label="Mobile Number"
            placeholder="Enter 10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            maxLength={10}
            required
          />

          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
            disabled={!formData.phone || !formData.password}
          >
            Sign In
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="auth-link">
              Register here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
