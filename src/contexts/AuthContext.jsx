import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [user, setUserState] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  function loginSuccess(data) {
    if (!data || !data.accessToken) {
      console.error('Login gagal: accessToken tidak ada');
      return;
    }

    const { accessToken } = data;

    localStorage.setItem('token', accessToken);
    setToken(accessToken);
  }

  function setUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    setUserState(userData);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUserState(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        loginSuccess,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}