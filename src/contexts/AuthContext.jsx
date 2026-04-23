import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  function loginSuccess({ accessToken }) {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, setUser, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}