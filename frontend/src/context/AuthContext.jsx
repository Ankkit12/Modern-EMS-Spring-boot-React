import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => AuthService.getStoredUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // keep user in sync with localStorage
    const onStorage = () => setUser(AuthService.getStoredUser());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const user = await AuthService.login(username, password);
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
