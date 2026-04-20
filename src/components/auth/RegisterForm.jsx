import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import { validateFormData } from '../../utils/validation';
import { ROUTES } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import toast from 'react-hot-toast';
import './AuthForms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const result = await registerUser(formData.name, formData.phone, formData.password);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate(ROUTES.LOGIN);
      } else {
        toast.error(result.error);
        setErrors({ general: result.error });
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" padding="large">
        <div className="auth-header">
           
          <h1 className="auth-title"> 
            <img src="/logo.png" alt="Logo" className="header-logo-image" /> Join the GDC's Team</h1>
          <p className="auth-subtitle">Create your account to start voting</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="auth-error-general">
              {errors.general}
            </div>
          )}

          <Input
            name="name"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

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
            placeholder="Create password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
            disabled={!formData.name || !formData.phone || !formData.password || !formData.confirmPassword}
          >
            Create Account
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
