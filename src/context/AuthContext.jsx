import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthChange } from '../services/authService';
// import { requestNotificationPermission } from '../services/notificationService'; // DISABLED
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/helpers';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Load user from localStorage first for faster initial load
    const savedUser = getLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA);
    if (savedUser) {
      setUser(savedUser);
    }

    // Set up Firebase auth listener
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        
        setUser(userData);
        setLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA, userData);
        
        // Request notification permission for logged in users - DISABLED
        // try {
        //   await requestNotificationPermission(firebaseUser.uid);
        // } catch (error) {
        //   console.error('Error requesting notification permission:', error);
        // }
      } else {
        setUser(null);
        removeLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA);
      }
      
      setLoading(false);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    initialized,
    setUser: (userData) => {
      setUser(userData);
      if (userData) {
        setLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA, userData);
      } else {
        removeLocalStorage(LOCAL_STORAGE_KEYS.USER_DATA);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
