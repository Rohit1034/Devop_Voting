import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
  icon = null,
  className = '',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full-width' : '';
  const disabledClass = (disabled || loading) ? 'btn-disabled' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="small" color="white" />
      )}
      {icon && !loading && (
        <span className="btn-icon">{icon}</span>
      )}
      <span className={`btn-text ${loading ? 'btn-text-hidden' : ''}`}>
        {children}
      </span>
    </button>
  );
};

export default Button;
