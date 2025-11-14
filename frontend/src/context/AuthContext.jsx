import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);
  

  const loginUser = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUserPoints = (newPoints) => {
    const updatedUser = { ...user, points: newPoints };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // const refreshUser = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) return;

  //     const response = await getUser();

  //     if (!response.ok) throw new Error('Failed to fetch user');
  //     const updatedUser = await response.json();

  //     setUser(updatedUser);
  //     localStorage.setItem('user', JSON.stringify(updatedUser));
  //   } catch (error) {
  //     console.error('Error refreshing user:', error);
  //   }
  // };


  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, updateUserPoints }}>
      {children}
    </AuthContext.Provider>
  );
};