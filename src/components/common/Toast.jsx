import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName="toast-container"
      containerStyle={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      }}
      toastOptions={{
        // Define default options
        className: 'toast',
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          maxWidth: '500px',
        },
        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: '#34C759',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#34C759',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#FF3B30',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#FF3B30',
          },
        },
        loading: {
          style: {
            background: '#007AFF',
          },
        },
      }}
    />
  );
};

export default Toast;
