import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('luxeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login Function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('luxeUser', JSON.stringify(userData));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxeUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);