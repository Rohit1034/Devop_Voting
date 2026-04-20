export const validatePhone = (phone) => {
  // Indian mobile number format: 10 digits starting with 6-9
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>\"']/g, '');
};

export const validateFormData = (formData) => {
  const errors = {};
  
  if (formData.name !== undefined && !validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters and contain only letters';
  }
  
  if (formData.phone !== undefined && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }
  
  if (formData.password !== undefined && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  if (formData.confirmPassword !== undefined && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
