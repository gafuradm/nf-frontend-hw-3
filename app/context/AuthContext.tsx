'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.get('/auth/me').then((response) => {
        setUser(response.data);
      }).catch((error) => {
        console.error('Failed to fetch user:', error);
      });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
      const userResponse = await axiosInstance.get('/auth/me');
      setUser(userResponse.data);
    } catch (error) {
      throw new Error('Failed to login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
