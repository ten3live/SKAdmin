import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {WEB} from'../theme'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const logout = () => {
    // Simulate a logout request to a server
    // In a real application, you would invalidate the authentication token
    setUser(null);
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };
  // useEffect to update the component when the user data changes
const GetUser = async () => {
  const users = localStorage.getItem("user");
  const data = JSON.parse(users);

  if (data) {
    try {
      setUser(data);
      const response = await axios.get(`${WEB.Backend}clientsby/${data.userId}`);
      setClient(response.data.data || []);
    } catch (error) {
      console.error("Failed to load matched clients for user:", error);
      setClient([]);
    }
  }
};

  
  useEffect(() => {
    GetUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, logout,client }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
